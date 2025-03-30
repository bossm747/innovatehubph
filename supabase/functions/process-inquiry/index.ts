
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
  service: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
  inquiryId?: string;
  [key: string]: any;
}

const getEmailTemplate = (data: FormData): string => {
  const commonHeader = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Inquiry from ${data.name}</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background-color: #f9f9f9; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          background-color: #ffffff; 
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .header { 
          text-align: center; 
          padding: 20px 0; 
          border-bottom: 1px solid #f0f0f0; 
        }
        .header img { 
          max-width: 150px; 
          height: auto; 
        }
        .content { 
          padding: 20px 0; 
        }
        .footer { 
          text-align: center; 
          padding: 20px 0; 
          color: #666; 
          font-size: 14px; 
          border-top: 1px solid #f0f0f0; 
        }
        h1 { 
          color: #1a1f2c; 
          margin-top: 0; 
        }
        .highlight {
          color: #9b87f5;
          font-weight: bold;
        }
        .detail-card {
          background-color: #f8f9fa;
          border-left: 4px solid #9b87f5;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .btn {
          display: inline-block;
          background-color: #9b87f5;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>InnovateHub <span class="highlight">Inquiry</span></h1>
        </div>
        <div class="content">
  `;

  const commonFooter = `
        </div>
        <div class="footer">
          <p>InnovateHub Inc. | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
          <p>This is an automated message. Please do not reply directly to this email.</p>
          <p><strong>IMPORTANT:</strong> This inquiry appears promising and might require personal follow-up by a sales representative.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  let serviceContent = '';
  
  switch(data.service) {
    case 'platapay':
      serviceContent = `
        <h2>New PlataPay Inquiry</h2>
        <p>You have received a new inquiry about PlataPay services from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Business Type:</strong> ${data.businessType || 'Not specified'}</p>
          <p><strong>Location:</strong> ${data.location || 'Not provided'}</p>
          <p><strong>Interested Services:</strong> ${Array.isArray(data.services) ? data.services.join(', ') : (data.services || 'Not specified')}</p>
          <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
        </div>
        <p>This prospect is interested in PlataPay services and may represent a good opportunity for agent/merchant recruitment. Please follow up within 24 hours.</p>
      `;
      break;
    
    case 'digital':
      serviceContent = `
        <h2>New Digital Customization Inquiry</h2>
        <p>You have received a new inquiry about custom software development from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Project Type:</strong> ${data.projectType || 'Not specified'}</p>
          <p><strong>Budget Range:</strong> ${data.budget || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
          <p><strong>Requirements:</strong> ${data.requirements || 'Not provided'}</p>
        </div>
        <p>Based on the budget and timeline information, this appears to be a promising lead that should be personally followed up by a solutions expert.</p>
      `;
      break;

    case 'ecommerce':
      serviceContent = `
        <h2>New E-Commerce Inquiry</h2>
        <p>You have received a new inquiry about e-commerce development from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Business Name:</strong> ${data.businessName || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Store Type:</strong> ${data.storeType || 'Not specified'}</p>
          <p><strong>Products:</strong> ${data.products || 'Not described'}</p>
          <p><strong>Features Requested:</strong> ${Array.isArray(data.features) ? data.features.join(', ') : (data.features || 'None specified')}</p>
          <p><strong>Budget Range:</strong> ${data.budget || 'Not specified'}</p>
          <p><strong>Additional Info:</strong> ${data.additionalInfo || 'None provided'}</p>
        </div>
        <p>This is a high-priority e-commerce inquiry with specific requirements. Consider assigning a dedicated project consultant for personal follow-up.</p>
      `;
      break;

    case 'ai':
      serviceContent = `
        <h2>New AI Solutions Inquiry</h2>
        <p>You have received a new inquiry about AI and automation solutions from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Industry:</strong> ${data.industry || 'Not specified'}</p>
          <p><strong>AI Solution Type:</strong> ${data.aiType || 'Not specified'}</p>
          <p><strong>Data Availability:</strong> ${data.dataAvailable || 'Not specified'}</p>
          <p><strong>Budget Range:</strong> ${data.budget || 'Not specified'}</p>
          <p><strong>Requirements:</strong> ${data.requirements || 'Not provided'}</p>
        </div>
        <p>This AI solution inquiry appears to be from a qualified prospect. The company profile and requirements suggest this could be a significant opportunity.</p>
      `;
      break;

    case 'global':
      serviceContent = `
        <h2>New Global Expansion Inquiry</h2>
        <p>You have received a new inquiry about international business expansion from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Position:</strong> ${data.position || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Industry:</strong> ${data.industry || 'Not specified'}</p>
          <p><strong>Company Size:</strong> ${data.companySize || 'Not specified'}</p>
          <p><strong>Current Markets:</strong> ${data.currentMarkets || 'Not specified'}</p>
          <p><strong>Target Markets:</strong> ${data.targetMarkets || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
          <p><strong>Expansion Goals:</strong> ${data.expansionGoals || 'Not provided'}</p>
        </div>
        <p>This is a high-value global expansion inquiry. The company profile indicates potential for a substantial partnership. Recommend immediate follow-up from a senior consultant.</p>
      `;
      break;

    case 'general':
    default:
      serviceContent = `
        <h2>New General Inquiry</h2>
        <p>You have received a new general inquiry from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
        </div>
        <p>Please evaluate this general inquiry to determine the appropriate next steps and service category.</p>
      `;
      break;
  }

  return commonHeader + serviceContent + commonFooter;
};

// Generate dynamic, personalized confirmation email using information from the inquiry
const generateAiConfirmationEmail = async (data: FormData): Promise<string> => {
  try {
    // Use the multi-agent-generate function to create a personalized email response
    const { data: aiResponse, error } = await fetch(
      `${Deno.env.get("SUPABASE_URL") || ""}/functions/v1/multi-agent-generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Deno.env.get("SUPABASE_ANON_KEY") || ""}`
        },
        body: JSON.stringify({
          content: `
            Generate a personalized email confirmation for a potential customer who just submitted an inquiry about ${data.service} services.
            
            Customer name: ${data.name}
            Service type: ${data.service}
            Company (if provided): ${data.company || "Not provided"}
            Budget (if provided): ${data.budget || "Not provided"}
            Timeline (if provided): ${data.timeline || "Not provided"}
            
            Additional information:
            ${Object.entries(data)
              .filter(([key, value]) => 
                !['name', 'email', 'service', 'company', 'budget', 'timeline', 'inquiryId'].includes(key) && 
                value && 
                typeof value === 'string'
              )
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n")
            }
            
            The email should:
            1. Thank them for their inquiry
            2. Include specific success stories or case studies related to their industry or needs
            3. Include specific examples or use cases that might interest them based on their inquiry
            4. Highlight key benefits of our services that address their specific needs
            5. Create a sense of urgency and excitement about working with us
            6. Include a clear call to action to schedule a call or consultation
            7. Be written in a professional but friendly tone that builds trust
            
            The email should be formatted as HTML with appropriate styling.
          `,
          provider: "gemini" // Using Gemini as primary, with auto-fallback
        })
      }
    ).then(res => res.json());

    if (error) {
      console.error("Error generating AI email:", error);
      // Fall back to the template-based email if AI generation fails
      return getConfirmationEmailTemplate(data);
    }

    // Extract the generated text from the AI response
    const generatedEmail = aiResponse?.text || "";
    
    if (!generatedEmail) {
      console.warn("AI generated empty email, falling back to template");
      return getConfirmationEmailTemplate(data);
    }
    
    console.log("Successfully generated AI email");
    return generatedEmail;
  } catch (error) {
    console.error("Error in AI email generation:", error);
    // Fall back to the template email in case of any error
    return getConfirmationEmailTemplate(data);
  }
};

const getConfirmationEmailTemplate = (data: FormData): string => {
  const serviceNames: Record<string, string> = {
    'platapay': 'PlataPay Services',
    'digital': 'Digital Customizations',
    'ecommerce': 'E-Commerce Development',
    'ai': 'AI Solutions',
    'global': 'Global Expansion',
    'general': 'General Inquiry'
  };

  const serviceName = serviceNames[data.service] || 'Inquiry';

  // Enhanced template with more engaging content and success stories
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Interest in InnovateHub!</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background-color: #f9f9f9; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          background-color: #ffffff; 
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .header { 
          text-align: center; 
          padding: 20px 0; 
          border-bottom: 1px solid #f0f0f0; 
        }
        .content { 
          padding: 20px 0; 
        }
        .footer { 
          text-align: center; 
          padding: 20px 0; 
          color: #666; 
          font-size: 14px; 
          border-top: 1px solid #f0f0f0; 
        }
        h1, h2 { 
          color: #1a1f2c; 
        }
        .highlight {
          color: #9b87f5;
          font-weight: bold;
        }
        .success-story {
          background-color: #f0f8ff;
          border-left: 4px solid #9b87f5;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .cta-button {
          display: inline-block;
          background-color: #9b87f5;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .contact-info {
          background-color: #f8f9fa;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
          text-align: center;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #9b87f5;
          text-decoration: none;
        }
        .service-benefits {
          margin: 20px 0;
        }
        .benefit-item {
          display: flex;
          margin-bottom: 10px;
        }
        .benefit-icon {
          margin-right: 10px;
          color: #9b87f5;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your <span class="highlight">Interest</span> in InnovateHub!</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>Thank you for your interest in our <strong>${serviceName}</strong>. We're excited about the opportunity to help you achieve your digital transformation goals!</p>
          
          ${getServiceSpecificContent(data)}
          
          <div class="success-story">
            <h3>Success Story: How We've Helped Similar Businesses</h3>
            ${getSuccessStory(data.service)}
          </div>
          
          <p>We'd love to learn more about your specific needs and how we can tailor our solutions to drive success for your business.</p>
          
          <div style="text-align: center;">
            <a href="https://innovatehub.ph/schedule-call" class="cta-button">Schedule a Free Consultation</a>
          </div>
          
          <p>In the meantime, one of our specialists will contact you within 24-48 business hours to discuss your requirements in detail.</p>
          
          <div class="contact-info">
            <p>If you have any urgent questions, please contact us at:</p>
            <p><strong>Phone:</strong> +63 917 685 1216</p>
            <p><strong>Email:</strong> businessdevelopment@innovatehub.ph</p>
          </div>
          
          <p>We look forward to the possibility of working together!</p>
          
          <p>Best regards,<br>The InnovateHub Team</p>
          
          <div class="social-links">
            <p>Connect with us:</p>
            <a href="https://www.facebook.com/InnovateHubPH">Facebook</a> | 
            <a href="https://www.linkedin.com/company/innovatehub-ph">LinkedIn</a>
          </div>
        </div>
        <div class="footer">
          <p>InnovateHub Inc. | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
          <p>This is an automated message. You're receiving this email because you submitted an inquiry on our website.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function to get service-specific content
const getServiceSpecificContent = (data: FormData): string => {
  switch (data.service) {
    case 'platapay':
      return `
        <h2>Revolutionize Your Business with PlataPay</h2>
        <p>PlataPay is more than just a digital wallet—it's a complete financial ecosystem designed to empower entrepreneurs like you. Our agents and merchants report an average increase of 30% in transaction volume within just the first 3 months.</p>
        
        <div class="service-benefits">
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Generate additional income through e-loading, bills payment, and remittance services</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Accept payments securely with our QR code system</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Attract tech-savvy customers with modern payment options</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Comprehensive training and support to ensure your success</span>
          </div>
        </div>
      `;
    
    case 'digital':
      return `
        <h2>Custom Digital Solutions Tailored for Your Business</h2>
        <p>At InnovateHub, we specialize in creating bespoke digital solutions that address your specific business challenges. Based on your inquiry${data.projectType ? ' about ' + data.projectType : ''}, we believe we can deliver exceptional value to your organization.</p>
        
        <div class="service-benefits">
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Custom software development aligned with your business goals</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Integration with existing systems for seamless operations</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>User-centered design that enhances user experience</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Ongoing support and optimization to ensure continuous improvement</span>
          </div>
        </div>
      `;
    
    case 'ecommerce':
      return `
        <h2>Transform Your Business with a Powerful E-Commerce Solution</h2>
        <p>Whether you're launching a new online store or enhancing an existing one, our e-commerce solutions can help you reach more customers and increase sales. With our expertise${data.storeType ? ' in ' + data.storeType : ''}, we're confident we can create a shopping experience that converts visitors into loyal customers.</p>
        
        <div class="service-benefits">
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Mobile-responsive storefronts that look great on any device</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Secure payment integration with multiple options</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Inventory management and order processing automation</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>SEO optimization to improve visibility and traffic</span>
          </div>
        </div>
      `;
    
    case 'ai':
      return `
        <h2>Harness the Power of AI for Your Business</h2>
        <p>Artificial Intelligence is transforming how businesses operate, and InnovateHub is at the forefront of this revolution. Based on your interest in ${data.aiType || 'AI solutions'}, we can develop customized AI applications that drive efficiency and create competitive advantage.</p>
        
        <div class="service-benefits">
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Custom AI models tailored to your business needs</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Process automation to reduce costs and increase efficiency</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Data analysis and insights for better decision-making</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Seamless integration with your existing technology stack</span>
          </div>
        </div>
      `;
    
    case 'global':
      return `
        <h2>Expand Your Business Globally with Confidence</h2>
        <p>International expansion requires careful planning and local expertise. With our presence in both the Philippines and Dubai, InnovateHub is uniquely positioned to help businesses like yours enter new markets successfully${data.targetMarkets ? ', especially in ' + data.targetMarkets : ''}.</p>
        
        <div class="service-benefits">
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Market entry strategy tailored to your specific goals</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Legal and regulatory compliance assistance</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Local partnerships and networking opportunities</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Cultural adaptation of your products and services</span>
          </div>
        </div>
      `;
    
    default:
      return `
        <h2>Innovative Solutions for Your Business Needs</h2>
        <p>At InnovateHub, we offer a comprehensive range of digital services designed to help businesses thrive in the digital age. From PlataPay digital payment solutions to custom software development, e-commerce platforms, AI implementation, and global expansion services, we have the expertise to address your specific needs.</p>
        
        <div class="service-benefits">
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Tailored solutions that align with your business goals</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>End-to-end implementation from concept to deployment</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Ongoing support and optimization</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Strategic partnership focused on your long-term success</span>
          </div>
        </div>
      `;
  }
};

// Helper function to get service-specific success story
const getSuccessStory = (service: string): string => {
  switch (service) {
    case 'platapay':
      return `
        <p>A small convenience store owner in Batangas increased their monthly revenue by 45% after becoming a PlataPay agent. By offering digital payments, e-loading, and bills payment services, they attracted new customers and created additional revenue streams. Within 6 months, they expanded to a second location due to the success of their PlataPay services.</p>
      `;
    
    case 'digital':
      return `
        <p>A logistics company was struggling with manual dispatch processes that led to delays and errors. We developed a custom logistics management system that automated their operations. The result? A 60% reduction in processing time, 30% decrease in delivery errors, and significantly improved customer satisfaction scores. The company has since expanded their fleet by 40%.</p>
      `;
    
    case 'ecommerce':
      return `
        <p>A traditional retail shop selling handcrafted products saw their sales decline during the pandemic. We helped them establish an online presence with a custom e-commerce store. Within three months, their online sales surpassed their previous in-store revenue, and they reached customers across the Philippines and internationally. They've since hired five new staff members to handle the increased demand.</p>
      `;
    
    case 'ai':
      return `
        <p>A financial services firm implemented our AI-powered customer service solution to handle routine inquiries. The system now successfully resolves 78% of customer queries without human intervention, reducing response times from hours to seconds. Customer satisfaction ratings increased by 35%, while the support team now focuses on more complex issues that truly require human expertise.</p>
      `;
    
    case 'global':
      return `
        <p>A Philippine-based food products manufacturer wanted to expand to the Middle East market. We guided them through the regulatory requirements, helped them adapt their packaging and marketing for the local culture, and connected them with distributors in Dubai. Within the first year, their international sales accounted for 25% of their total revenue, and they're now expanding to three additional countries.</p>
      `;
    
    default:
      return `
        <p>A startup with an innovative idea but limited technical expertise partnered with InnovateHub to bring their vision to life. We developed their platform from concept to launch, helping them secure their first round of funding. Today, they're a thriving business with thousands of users, and we continue to support their growth with ongoing development and strategic technology advice.</p>
      `;
  }
};

const sendEmail = async (data: FormData): Promise<{ success: boolean, message: string }> => {
  try {
    console.log('Attempting to send email notifications for inquiry');
    
    const client = new SmtpClient();

    // Connect to Hostinger SMTP server
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOST") || "smtp.hostinger.com",
      port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
      username: Deno.env.get("SMTP_USERNAME") || "inquiries@innovatehub.ph",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    });

    console.log('Connected to SMTP server successfully');

    // Send notification email to business
    console.log('Sending notification email to business');
    const notificationEmail = await client.send({
      from: Deno.env.get("SMTP_USERNAME") || "inquiries@innovatehub.ph",
      to: "businessdevelopment@innovatehub.ph",
      subject: `New ${data.service.charAt(0).toUpperCase() + data.service.slice(1)} Inquiry from ${data.name}`,
      html: getEmailTemplate(data),
    });

    console.log('Business notification email sent');

    // Generate AI-powered personalized confirmation email
    console.log('Generating AI confirmation email for customer');
    let confirmationEmailHtml;
    try {
      confirmationEmailHtml = await generateAiConfirmationEmail(data);
      console.log('Successfully generated AI confirmation email');
    } catch (aiError) {
      console.error('Error generating AI email:', aiError);
      confirmationEmailHtml = getConfirmationEmailTemplate(data);
      console.log('Falling back to template confirmation email');
    }

    // Send confirmation email to customer
    console.log('Sending confirmation email to customer:', data.email);
    const confirmationEmail = await client.send({
      from: Deno.env.get("SMTP_USERNAME") || "inquiries@innovatehub.ph",
      to: data.email,
      subject: "Thank You for Your Interest in InnovateHub!",
      html: confirmationEmailHtml,
    });

    console.log('Customer confirmation email sent');

    await client.close();
    
    return { 
      success: true, 
      message: "Emails sent successfully" 
    };
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("SMTP settings:", {
      host: Deno.env.get("SMTP_HOST") || "smtp.hostinger.com",
      port: Deno.env.get("SMTP_PORT") || "465",
      username: Deno.env.get("SMTP_USERNAME") || "inquiries@innovatehub.ph",
      passwordProvided: Boolean(Deno.env.get("SMTP_PASSWORD"))
    });
    return { 
      success: false, 
      message: `Failed to send email: ${error.message}` 
    };
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  try {
    // Parse the request body
    const formData: FormData = await req.json();
    console.log('Received inquiry data for processing:', {
      service: formData.service,
      name: formData.name,
      email: formData.email ? `${formData.email.substring(0, 3)}...` : undefined,
      inquiryId: formData.inquiryId
    });
    
    // Validate required fields
    if (!formData.service || !formData.name || !formData.email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Process the form and send emails
    console.log('Starting email sending process');
    const result = await sendEmail(formData);

    if (!result.success) {
      console.error('Failed to send emails:', result.message);
      return new Response(JSON.stringify({ error: result.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Return success response
    console.log('Email process completed successfully');
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Emails sent successfully', 
      inquiryId: formData.inquiryId
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process form submission',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
});
