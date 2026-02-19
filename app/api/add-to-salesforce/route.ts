import { NextResponse } from "next/server";

/**
 * POST /api/add-to-salesforce
 * 
 * Creates a new record in Salesforce's New_Lead_discovery__c object
 * Uses Perplexity AI to enrich company data before creating the record
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, tenderTitle, location, module } = body;

    console.log("🚀 === ADD TO SALESFORCE REQUEST ===");
    console.log(`Company: ${companyName}`);
    console.log(`Tender: ${tenderTitle}`);
    console.log(`Module: ${module}`);

    // Validate required fields
    if (!companyName) {
      return NextResponse.json(
        { error: "Missing required field: companyName" },
        { status: 400 }
      );
    }

    // Step 1: Enrich with Perplexity AI
    console.log("🤖 Calling Perplexity for enrichment...");
    const enrichmentResult = await enrichWithPerplexity(companyName, tenderTitle, location);

    if (!enrichmentResult.success) {
      console.error("❌ Perplexity enrichment failed:", enrichmentResult.error);
      return NextResponse.json(
        { error: "Failed to enrich company data", details: enrichmentResult.error },
        { status: 500 }
      );
    }

    console.log("✅ Perplexity enrichment completed");

    // Ensure data exists
    if (!enrichmentResult.data) {
      return NextResponse.json(
        { error: "No enrichment data returned" },
        { status: 500 }
      );
    }

    // Step 2: Create record in Salesforce
    console.log("📤 Creating Salesforce record...");
    const sfResult = await createSalesforceRecord(companyName, enrichmentResult.data);

    if (!sfResult.success) {
      console.error("❌ Salesforce create failed:", sfResult.error);
      return NextResponse.json(
        { error: "Failed to create Salesforce record", details: sfResult.error },
        { status: 500 }
      );
    }

    console.log("✅ Salesforce record created:", sfResult.recordId);

    return NextResponse.json({
      success: true,
      recordId: sfResult.recordId,
      message: "Lead added to Salesforce successfully",
      enrichment: {
        companyName,
        fieldsPopulated: Object.keys(enrichmentResult.data).length,
      },
    });

  } catch (error) {
    console.error("❌ Error in add-to-salesforce:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * Perplexity AI Enrichment
 * Generates structured business intelligence for the company
 */
interface EnrichmentData {
  Business_Identity_Legal_Verification__c: string;
  Ownership_Leadership_Structure__c: string;
  Customer_Credit_Profile__c: string;
  Market_Position__c: string;
  Key_Contacts_Influence_Map__c: string;
  Opportunity_Intelligence_Profile__c: string;
}

interface EnrichmentResult {
  success: boolean;
  data?: EnrichmentData;
  error?: string;
}

async function enrichWithPerplexity(
  companyName: string,
  tenderTitle?: string,
  location?: string
): Promise<EnrichmentResult> {
  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    return { success: false, error: "PERPLEXITY_API_KEY not configured" };
  }

  const systemPrompt = `You are an expert business intelligence analyst specializing in Indian companies in construction, infrastructure, and manufacturing sectors.

Your job is to extract structured, verifiable business facts from authoritative Indian sources.

STRICT BEHAVIOR RULES:
1. Write in concise, factual, corporate language. No storytelling.
2. Format EVERY field as line-by-line "Label: Value" pairs, one per line. Example:
   GST: 19AAATN1963H1ZF
   CIN: U45200MH1990PLC123456
   PAN: AAATN1963H
   Incorp: 1990
   HQ: Bandra Kurla Complex, Mumbai
3. Prioritize Indian official sources: MCA filings, GST portal, company website, annual reports, BSE/NSE, credit rating reports.
4. No assumptions. No invented data. If a specific sub-field is unavailable, write "N/A".
5. NEVER leave a field empty. Always provide at least 3 sub-fields per section even if partial.

Return output ONLY as strict JSON following this schema:
{
  "Business_Identity_Legal_Verification__c": "CIN: ...\nGST: ...\nPAN: ...\nIncorp Date: ...\nReg Address: ...\nEntity Type: ...",
  "Ownership_Leadership_Structure__c": "Ownership: ...\nChairman: ...\nMD/CEO: ...\nPromoters: ...\nBoard: ...",
  "Customer_Credit_Profile__c": "Rating Agency: ...\nRating: ...\nOutlook: ...\nDebt Coverage: ...\nGearing: ...\nPayment History: ...",
  "Market_Position__c": "Sector: ...\nCapacity/Scale: ...\nMarket Share: ...\nCompetitors: ...\nStrength: ...",
  "Key_Contacts_Influence_Map__c": "CMD/Chairman: ...\nMD: ...\nDir (Commercial): ...\nDir (Finance): ...\nProcurement Head: ...\nDecision Channel: ...",
  "Opportunity_Intelligence_Profile__c": "Capex Plan: ...\nProject: ...\nProcurement: ...\nSteel Requirement: ...\nTimeline: ..."
}`;

  const userPrompt = `Research this company for a steel sales opportunity:

COMPANY: ${companyName}
${tenderTitle ? `PROJECT CONTEXT: ${tenderTitle}` : ""}
${location ? `LOCATION: ${location}` : ""}

Search for:
1. "${companyName}" MCA registration CIN GST PAN incorporation date registered address
2. "${companyName}" directors board members shareholders ownership promoters chairperson MD CEO
3. "${companyName}" credit rating CRISIL ICRA CARE BRICKWORK financial health NPA debt gearing payment
4. "${companyName}" market position capacity industry ranking competitors strengths
5. "${companyName}" procurement head VP commercial purchase director contact decision maker
6. "${companyName}" capex expansion plan steel procurement requirement project tender pipeline

IMPORTANT: Use line-by-line Label: Value format for every field (e.g. "GST: ..."). 
NEVER return empty string for any field — use "N/A" for unknown sub-values.
Return strict JSON only.`;

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Perplexity API Error:", error);
      return { success: false, error: error.message || "Perplexity API failed" };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return { success: false, error: "No content in Perplexity response" };
    }

    // Parse JSON from response
    const jsonMatch =
      content.match(/```json\s*([\s\S]*?)\s*```/) ||
      content.match(/```\s*([\s\S]*?)\s*```/) ||
      content.match(/\{[\s\S]*\}/);

    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]).trim() : content.trim();

    try {
      const enrichedData = JSON.parse(jsonStr) as EnrichmentData;

      // Truncate fields to 255 chars (Salesforce limit)
      const truncated: EnrichmentData = {
        Business_Identity_Legal_Verification__c: truncate(enrichedData.Business_Identity_Legal_Verification__c),
        Ownership_Leadership_Structure__c: truncate(enrichedData.Ownership_Leadership_Structure__c),
        Customer_Credit_Profile__c: truncate(enrichedData.Customer_Credit_Profile__c),
        Market_Position__c: truncate(enrichedData.Market_Position__c),
        Key_Contacts_Influence_Map__c: truncate(enrichedData.Key_Contacts_Influence_Map__c),
        Opportunity_Intelligence_Profile__c: truncate(enrichedData.Opportunity_Intelligence_Profile__c),
      };

      return { success: true, data: truncated };
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      return { success: false, error: "Failed to parse Perplexity response as JSON" };
    }
  } catch (error) {
    console.error("❌ Error calling Perplexity:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Truncate string to Salesforce Long Text Area field limit
 */
function truncate(str: string | undefined, maxLength = 2000): string {
  if (!str) return "";
  return str.length > maxLength ? str.substring(0, maxLength - 3) + "..." : str;
}

/**
 * Create record in Salesforce New_Lead_discovery__c object
 */
interface SalesforceResult {
  success: boolean;
  recordId?: string;
  error?: string;
}

async function createSalesforceRecord(
  companyName: string,
  enrichment: EnrichmentData
): Promise<SalesforceResult> {
  const instanceUrl = process.env.SALESFORCE_INSTANCE_URL;
  const consumerKey = process.env.SALESFORCE_CONSUMER_KEY;
  const consumerSecret = process.env.SALESFORCE_CONSUMER_SECRET;

  if (!instanceUrl || !consumerKey || !consumerSecret) {
    return { success: false, error: "Salesforce credentials not configured" };
  }

  try {
    // Step 1: Get access token
    const tokenParams = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: consumerKey,
      client_secret: consumerSecret,
    });

    const tokenRes = await fetch(`${instanceUrl}/services/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });

    if (!tokenRes.ok) {
      const error = await tokenRes.json();
      console.error("❌ Salesforce auth error:", error);
      return { success: false, error: "Salesforce authentication failed" };
    }

    const { access_token, instance_url } = await tokenRes.json();

    // Step 2: Create record
    const sfPayload = {
      Name: companyName,
      companyName__c: companyName,
      Business_Identity_Legal_Verification__c: enrichment.Business_Identity_Legal_Verification__c,
      Ownership_Leadership_Structure__c: enrichment.Ownership_Leadership_Structure__c,
      Customer_Credit_Profile__c: enrichment.Customer_Credit_Profile__c,
      Market_Position__c: enrichment.Market_Position__c,
      Key_Contacts_Influence_Map__c: enrichment.Key_Contacts_Influence_Map__c,
      Opportunity_Intelligence_Profile__c: enrichment.Opportunity_Intelligence_Profile__c,
    };

    // Remove undefined/empty fields
    Object.keys(sfPayload).forEach((key) => {
      const k = key as keyof typeof sfPayload;
      if (sfPayload[k] === undefined || sfPayload[k] === "") {
        delete sfPayload[k];
      }
    });

    const createRes = await fetch(
      `${instance_url}/services/data/v58.0/sobjects/New_Lead_discovery__c`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sfPayload),
      }
    );

    if (!createRes.ok) {
      const error = await createRes.json();
      console.error("❌ Salesforce create error:", error);
      return { success: false, error: error[0]?.message || "Failed to create record" };
    }

    const result = await createRes.json();
    return { success: true, recordId: result.id };

  } catch (error) {
    console.error("❌ Salesforce error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
