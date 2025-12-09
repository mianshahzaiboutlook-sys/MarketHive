

import { SENDER_EMAIL } from "../config/aws-ses.js";

const emailTemplate = (receiver_email, subject, body) => {
  return {
    Source: SENDER_EMAIL,
    Destination: {
      ToAddresses: [receiver_email],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: `MarketHive.com ${subject}`,
      },

      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
                             <html>
                                   <body>
                                   
                                      <h1> MarketHive.com  </h1>

                                      ${body}

                                      <p>Thank you contact we will reach your </p>
                                   
                                   </body>

                             </html>
                             
                             `,
        },
      },
    },
  };
};

export default emailTemplate;
