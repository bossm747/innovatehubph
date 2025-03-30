
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | InnovateHub Inc.</title>
        <meta 
          name="description" 
          content="Learn about how InnovateHub Inc. collects, uses, and protects your personal information."
        />
      </Helmet>
      
      <Navbar />
      
      <main className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-6">Last Updated: September 1, 2023</p>
            
            <div className="prose max-w-none">
              <p>
                InnovateHub Inc. ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
              <p>
                We collect several types of information from and about users of our website and services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Personal information such as name, email address, phone number, and company details when you submit inquiries or application forms.</li>
                <li>Information about your internet connection, the equipment you use to access our website, and usage details.</li>
                <li>Financial information necessary for processing payments and transactions related to our services.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
              <p>
                We use information that we collect about you or that you provide to us:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>To present our website and its contents to you.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
                <li>To fulfill any other purpose for which you provide it.</li>
                <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
                <li>To notify you about changes to our website or any products or services we offer or provide.</li>
                <li>For any other purpose with your consent.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Disclosure of Your Information</h2>
              <p>
                We may disclose aggregated information about our users and information that does not identify any individual without restriction.
              </p>
              <p className="mt-4">
                We may disclose personal information that we collect or you provide:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>To our subsidiaries and affiliates.</li>
                <li>To contractors, service providers, and other third parties we use to support our business.</li>
                <li>To fulfill the purpose for which you provide it.</li>
                <li>For any other purpose disclosed by us when you provide the information.</li>
                <li>With your consent.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
              <p>
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Changes to Our Privacy Policy</h2>
              <p>
                It is our policy to post any changes we make to our privacy policy on this page. The date the privacy policy was last revised is identified at the top of the page.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Contact Information</h2>
              <p>
                To ask questions or comment about this privacy policy and our privacy practices, contact us at:
              </p>
              <div className="my-4 pl-6">
                <p><strong>Email:</strong> privacy@innovatehub.ph</p>
                <p><strong>Address:</strong> RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
                <p><strong>Phone:</strong> +63 917 685 1216</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
