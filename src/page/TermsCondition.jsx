import React, { Fragment } from "react";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { Box, Breadcrumbs } from "@mui/material";
import { BsFillPatchExclamationFill } from "react-icons/bs";

const TermsCondition = () => {
  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <BsFillPatchExclamationFill
                size={23}
                className="min-w-max text-emerald-500"
              />
              &nbsp;{" "}
              <span className="text-emerald-500">Terms & Conditions</span>
            </Box>
          </Breadcrumbs>
        </PackageBreadcrumb>

        <div className="bg-white  my-10 w-full flex flex-col rounded-md shadow-md ">
          <div className="bg-emerald-400 rounded-t-md h-12 text-xl text-white font-bold font-sans  flex justify-center items-center">
            Terms & Conditions
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <p className="text-lg font-small font-sans my-3">
              Last Updated: [22/08/2024]
            </p>

            <span className="text-lg font-small font-sans ">
              {`Welcome to MRCS Aid! These Terms and Conditions govern your use of our website (https://www.mrcsaid.com) and services. By accessing or using MRCS Aid, you agree to comply with and be bound by the following terms. If you do not agree with these terms, please do not use our website or services.`}
            </span>

            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              1. Acceptance of Terms
            </span>
            <span className="text-lg font-small font-sans ">
              {`By accessing or using MRCS Aid, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. These terms apply to all visitors, users, and others who access or use the service.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              2. Use of Website
            </span>
            <span className="text-lg font-small font-sans ">
              {`You agree to use the website only for lawful purposes. You are prohibited from violating or attempting to violate the security of the website or using it to infringe on the rights of others.
            `}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              3. Intellectual Property
            </span>
            <span className="text-lg font-small font-sans ">
              {`All content on MRCS Aid, including but not limited to text, graphics, logos, images, videos, and software, is the property of MRCS Aid and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any material found on this website without prior written permission from MRCS Aid.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              4. User Accounts
            </span>
            <span className="text-lg font-small font-sans ">
              {`To access certain features of the website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information, including your password. You agree to accept responsibility for all activities that occur under your account.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              5. Payment and Subscription
            </span>
            <span className="text-lg font-small font-sans ">
              {`Some services offered on MRCS Aid may require payment or subscription. By purchasing a service, you agree to provide accurate and complete payment information. All fees are non-refundable unless otherwise stated.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              6. Advertising
            </span>
            <span className="text-lg font-small font-sans ">
              {`MRCS Aid reserves the right to display advertisements to all users, including paid users. These advertisements may be tailored to your interests based on your usage of the website. By using our website, you agree to the display of such advertisements.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              7. Limitation of Liability
            </span>
            <span className="text-lg font-small font-sans ">
              {`MRCS Aid strives to ensure that the information provided on this website is accurate and up-to-date. However, we do not warrant the accuracy, completeness, or usefulness of this information. In no event shall MRCS Aid or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the website.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              8. Third-Party Links
            </span>
            <span className="text-lg font-small font-sans ">
              {`Our website may contain links to third-party websites that are not owned or controlled by MRCS Aid. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              9. Termination
            </span>
            <span className="text-lg font-small font-sans ">
              {`We may terminate or suspend your access to the website and its services, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach these Terms and Conditions.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              10. Changes to Terms
            </span>
            <span className="text-lg font-small font-sans ">
              {`MRCS Aid reserves the right to modify or replace these Terms and Conditions at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the website after any changes to the Terms and Conditions constitutes your acceptance of the new terms.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              11. Governing Law
            </span>
            <span className="text-lg font-small font-sans ">
              {`These Terms and Conditions shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts in an appropriate venue as determined by MRCS Aid.`}
            </span>
          </div>

          <div className="px-8 py-4 flex flex-col ">
            <span className="text-2xl font-medium font-sans py-2 text-emerald-500">
              12. Contact Information
            </span>
            <span className="text-lg font-small font-sans ">
              {`If you have any questions about these Terms and Conditions, please contact us at contact@mrcsaid.com.`}
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TermsCondition;
