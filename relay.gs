/**
 * GOOGLE APPS SCRIPT - CONTACT FORM RELAY (NNAEMEKA SYSTEMS)
 * 
 * Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project named "Nnaemeka Portfolio Relay"
 * 3. Delete all code in Code.gs and paste this code.
 * 4. Click 'Deploy' -> 'New Deployment'
 * 5. Select 'Web App'
 * 6. Execute as: 'Me'
 * 7. Who has access: 'Anyone' (IMPORTANT: Must be "Anyone" for fetch to work)
 * 8. Copy the Web App URL and paste it into the 'action' attribute of your form in index.html.
 */

function doPost(e) {
  const myEmail = "machogeorgia4@gmail.com"; 
  
  try {
    // 1. Parse Data
    let name, email, message;
    
    if (e.parameter && e.parameter.name) {
      name = e.parameter.name;
      email = e.parameter.email;
      message = e.parameter.message;
    } else if (e.postData && e.postData.contents) {
      const data = JSON.parse(e.postData.contents);
      name = data.name;
      email = data.email;
      message = data.message;
    }

    name = name || "Potential Lead";
    email = email || "Unknown Email";
    message = message || "No message content provided.";

    // 2. Build HTML Email Template
    const subject = "🚀 NEW LEAD: " + name;
    const htmlBody = `
      <div style="font-family: sans-serif; background-color: #f4f7f9; padding: 10px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e1e8ed;">
          <!-- Header -->
          <div style="background-color: #0d1319; padding: 25px 15px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px;">NNAEMEKA.</h1>
            <p style="color: #10b981; margin: 5px 0 0; font-size: 11px; text-transform: uppercase; font-family: monospace;">Inbound Lead Detected</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 25px 15px;">
            <p style="font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
              You have a new strategy call request from your portfolio website.
            </p>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 35%; color: #888; font-size: 12px; text-transform: uppercase;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 12px; text-transform: uppercase;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;"><a href="mailto:${email}" style="color: #0043CE; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 20px 0 10px; color: #888; font-size: 12px; text-transform: uppercase;" colspan="2">Project Details</td>
              </tr>
              <tr>
                <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px; line-height: 1.6; font-style: italic; font-size: 14px;" colspan="2">
                  "${message}"
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 35px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #10b981; color: #000; padding: 14px 25px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply to Lead</a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 20px 10px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 10px; margin: 0;">Sent via Custom GAS Automation Relay</p>
            <p style="color: #999; font-size: 10px; margin: 5px 0 0;">${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    // 3. Send Email
    const recipient = (myEmail && myEmail.includes("@")) ? myEmail : Session.getActiveUser().getEmail();
    
    GmailApp.sendEmail(recipient, subject, "", {
      htmlBody: htmlBody,
      name: "Nnaemeka Systems (Automation)"
    });

    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (f) {
    console.error("Error: " + f.toString());
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "error": f.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Support for preflight CORS requests
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
