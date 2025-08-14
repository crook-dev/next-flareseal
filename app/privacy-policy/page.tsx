import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | FlareSeal',
  description: 'Learn about how FlareSeal collects, uses, and protects your personal information when you visit our website or make a purchase.',
  alternates: {
    canonical: 'https://www.flareseal.com/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return (
  <>
    {/* JSON-LD Structured Data */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy',
          description: 'Learn about how FlareSeal collects, uses, and protects your personal information when you visit our website or make a purchase.',
          url: 'https://www.flareseal.com/privacy-policy',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.flareseal.com'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Privacy Policy',
                item: 'https://www.flareseal.com/privacy-policy'
              }
            ]
          }
        }).replace(/</g, '\\u003c'),
      }}
    />

    <main>
    <div className="container py-8">
    <h1 className="text-center mb-8 text-primary">Privacy Policy</h1>
    <p>
      This Privacy Policy describes how flareseal.com (the “Site” or “we”)
      collects, uses, and discloses your Personal Information when you visit
      or make a purchase from the Site.
    </p>
    <h2 className="text-primary text-2xl">Collecting Personal Information</h2>
    <p>
      When you visit the Site, we collect certain information about your
      device, your interaction with the Site, and information necessary to
      process your purchases. We may also collect additional information if
      you contact us for customer support. In this Privacy Policy, we refer to
      any information that can uniquely identify an individual (including the
      information below) as “Personal Information”. See the list below for
      more information about what Personal Information we collect and why.
    </p>
    <p><u>Device information</u></p>
    <ul className="list-disc list-inside my-4">
      <li>
        <strong>Examples of Personal Information collected:</strong> version
        of web browser, IP address, time zone, cookie information, what sites
        or products you view, search terms, and how you interact with the
        Site.
      </li>
      <li>
        <strong>Purpose of collection:</strong> to load the Site accurately
        for you, and to perform analytics on Site usage to optimize our Site.
      </li>
      <li>
        <strong>Source of collection:</strong> Collected automatically when
        you access our Site using cookies, log files, web beacons, tags, or
        pixels.
      </li>
      <li>
        <strong>Disclosure for a business purpose:</strong> shared with our
        processor Shopify.
      </li>
    </ul>
    <p><u>Order information</u></p>
    <ul className="list-disc list-inside my-4">
      <li>
        <strong>Examples of Personal Information collected:</strong> name,
        billing address, shipping address, payment information (including
        credit card numbers), email address, and phone number.
      </li>
      <li>
        <strong>Purpose of collection:</strong> to provide products or
        services to you to fulfill our contract, to process your payment
        information, arrange for shipping, and provide you with invoices
        and/or order confirmations, communicate with you, screen our orders
        for potential risk or fraud, and when in line with the preferences you
        have shared with us, provide you with information or advertising
        relating to our products or services.
      </li>
      <li><strong>Source of collection:</strong> collected from you.</li>
      <li>
        <strong>Disclosure for a business purpose:</strong> shared with our
        processor Shopify.
      </li>
    </ul>
    <p><u>Customer support information</u></p>
    <ul className="list-disc list-inside my-4">
      <li>
        <strong>Examples of Personal Information collected:</strong> Email
        address, Name
      </li>
      <li>
        <strong>Purpose of collection:</strong> to provide customer support.
      </li>
      <li><strong>Source of collection:</strong> collected from you.</li>
    </ul>
    <h3 className="text-primary text-xl">Minors</h3>
    <p>
      We do not intentionally collect Personal Information from children. If
      you are the parent or guardian and believe your child has provided us
      with Personal Information, please contact us at the address below to
      request deletion.
    </p>
    <h2 className="text-primary text-2xl">Sharing Personal Information</h2>
    <p>
      We share your Personal Information with service providers to help us
      provide our services and fulfill our contracts with you, as described
      above. For example:
    </p>
    <ul className="list-disc list-inside my-4">
      <li>
        We use Shopify to power our online store. You can read more about how
        Shopify uses your Personal Information here:
        <Link
          href="https://www.shopify.com/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
          >https://www.shopify.com/legal/privacy</Link
        >.
      </li>
      <li>
        We may share your Personal Information to comply with applicable laws
        and regulations, to respond to a subpoena, search warrant or other
        lawful request for information we receive, or to otherwise protect our
        rights.
      </li>
    </ul>
    <h3 className="text-primary text-xl">Behavioural Advertising</h3>
    <p>
      As described above, we use your Personal Information to provide you with
      targeted advertisements or marketing communications we believe may be of
      interest to you. For example:
    </p>
    <ul className="list-disc list-inside my-4">
      <li>
        We use Google Analytics to help us understand how our customers use
        the Site. You can read more about how Google uses your Personal
        Information here:
        <Link
          href="https://policies.google.com/privacy?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          >https://policies.google.com/privacy?hl=en</Link
        >.You can also opt-out of Google Analytics here:
        <Link
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          >https://tools.google.com/dlpage/gaoptout</Link
        >.
      </li>
      <li>
        We share information about your use of the Site, your purchases, and
        your interaction with our ads on other websites with our advertising
        partners. We collect and share some of this information directly with
        our advertising partners, and in some cases through the use of cookies
        or other similar technologies (which you may consent to, depending on
        your location).
      </li>
    </ul>
    <p>
      For more information about how targeted advertising works, you can visit
      the Network Advertising Initiative&apos;s (“NAI”) educational page at
      <Link
        href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
        target="_blank"
        rel="noopener noreferrer"
        >http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</Link
      >.
    </p>
    <p>You can opt out of targeted advertising by:</p>
      <ul className="list-disc list-inside my-4">
      <li>
        <i>FACEBOOK - </i>
        <Link
          href="https://www.facebook.com/settings/?tab=ads"
          target="_blank"
          rel="noopener noreferrer"
          >https://www.facebook.com/settings/?tab=ads</Link
        >
      </li>
      <li>
        <i>GOOGLE - </i>
        <Link
          href="https://www.google.com/settings/ads/anonymous"
          target="_blank"
          rel="noopener noreferrer"
          >https://www.google.com/settings/ads/anonymous</Link
        >
      </li>
      <li>
        <i>BING - </i>
        <Link
          href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
          target="_blank"
          rel="noopener noreferrer"
            >https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
          </Link>
      </li>
    </ul>
    <p>
      Additionally, you can opt out of some of these services by visiting the
      Digital Advertising Alliance&apos;s opt-out portal at:
      <Link
        href="http://optout.aboutads.info/"
        target="_blank"
        rel="noopener noreferrer"
        >http://optout.aboutads.info/</Link
      >.
    </p>
    <h2 className="text-primary text-2xl">Using Personal Information</h2>
    <p>
      We use your personal Information to provide our services to you, which
      includes: offering products for sale, processing payments, shipping and
      fulfillment of your order, and keeping you up to date on new products,
      services, and offers.
    </p>
    <h3 className="text-primary text-xl">Retention</h3>
    <p>
      When you place an order through the Site, we will retain your Personal
      Information for our records unless and until you ask us to erase this
      information. For more information on your right of erasure, please see
      the ‘Your rights’ section below.
    </p>
    <h3 className="text-primary text-xl">Automatic decision-making</h3>
    <p>
      If you are a resident of the EEA, you have the right to object to
      processing based solely on automated decision-making (which includes
      profiling), when that decision-making has a legal effect on you or
      otherwise significantly affects you.
    </p>
    <p>
      We do not engage in fully automated decision-making that has a legal or
      otherwise significant effect using customer data.
    </p>
    <p>
      Our processor Shopify uses limited automated decision-making to prevent
      fraud that does not have a legal or otherwise significant effect on you.
    </p>
    <p>
      Services that include elements of automated decision-making include:
    </p>
    <ul className="list-disc list-inside my-4">
      <li>
        Temporary denylist of IP addresses associated with repeated failed
        transactions. This denylist persists for a small number of hours.
      </li>
      <li>
        Temporary denylist of credit cards associated with denylisted IP
        addresses. This denylist persists for a small number of days.
      </li>
    </ul>
    <h2 className="text-primary text-2xl">Cookies</h2>
    <p>
      A cookie is a small amount of information that&apos;s downloaded to your
      computer or device when you visit our Site. We use a number of different
      cookies, including functional, performance, advertising, and social
      media or content cookies. Cookies make your browsing experience better
      by allowing the website to remember your actions and preferences (such
      as login and region selection). This means you don&apos;t have to re-enter
      this information each time you return to the site or browse from one
      page to another. Cookies also provide information on how people use the
      website, for instance whether it&apos;s their first time visiting or if they
      are a frequent visitor.
    </p>
    <p>
      We use the following cookies to optimize your experience on our Site and
      to provide our services.
    </p>
    <h3 className="text-primary text-xl">
      Cookies Necessary for the Functioning of the Store
    </h3>
    <table className="mb-4">
      <thead>
        <tr>
          <th><strong>Name</strong></th>
          <th><strong>Function</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><i>_ab</i></td>
          <td>Used in connection with access to admin.</td>
        </tr>
        <tr>
          <td><i>_secure_session_id</i></td>
          <td>Used in connection with navigation through a storefront.</td>
        </tr>
        <tr>
          <td><i>cart</i></td>
          <td>Used in connection with shopping cart.</td>
        </tr>
        <tr>
          <td><i>cart_sig</i></td>
          <td>Used in connection with checkout.</td>
        </tr>
        <tr>
          <td><i>cart_ts</i></td>
          <td>Used in connection with checkout.</td>
        </tr>
        <tr>
          <td><i>checkout_token</i></td>
          <td>Used in connection with checkout.</td>
        </tr>
        <tr>
          <td><i>secret</i></td>
          <td>Used in connection with checkout.</td>
        </tr>
        <tr>
          <td><i>secure_customer_sig</i></td>
          <td>Used in connection with customer login.</td>
        </tr>
        <tr>
          <td><i>storefront_digest</i></td>
          <td>Used in connection with customer login.</td>
        </tr>
        <tr>
          <td><i>_shopify_u</i></td>
          <td>Used to facilitate updating customer account information.</td>
        </tr>
      </tbody>
    </table>
    <h3 className="text-primary text-xl">Reporting and Analytics</h3>
    <table className="mb-4">
      <tbody>
        <tr>
          <th><strong>Name</strong></th>
          <th><strong>Function</strong></th>
        </tr>
        <tr>
          <td><i>_tracking_consent</i></td>
          <td>Tracking preferences.</td>
        </tr>
        <tr>
          <td><i>_landing_page</i></td>
          <td>Track landing pages</td>
        </tr>
        <tr>
          <td><i>_orig_referrer</i></td>
          <td>Track landing pages</td>
        </tr>
        <tr>
          <td><i>_s</i></td>
          <td>Shopify analytics.</td>
        </tr>
        <tr>
          <td><i>_shopify_fs</i></td>
          <td>Shopify analytics.</td>
        </tr>
        <tr>
          <td><i>_shopify_s</i></td>
          <td>Shopify analytics.</td>
        </tr>
        <tr>
          <td><i>_shopify_sa_p</i></td>
          <td>Shopify analytics relating to marketing &amp; referrals.</td>
        </tr>
        <tr>
          <td><i>_shopify_sa_t</i></td>
          <td>Shopify analytics relating to marketing &amp; referrals.</td>
        </tr>
        <tr>
          <td><i>_shopify_y</i></td>
          <td>Shopify analytics.</td>
        </tr>
        <tr>
          <td><i>_y</i></td>
          <td>Shopify analytics.</td>
        </tr>
      </tbody>
    </table>
    <p>
      The length of time that a cookie remains on your computer or mobile
      device depends on whether it is a &quot;persistent&quot; or &quot;session&quot; cookie.
      Session cookies last until you stop browsing and persistent cookies last
      until they expire or are deleted. Most of the cookies we use are
      persistent and will expire between 30 minutes and two years from the
      date they are downloaded to your device.
    </p>
    <p>
      You can control and manage cookies in various ways. Please keep in mind
      that removing or blocking cookies can negatively impact your user
      experience and parts of our website may no longer be fully accessible.
    </p>
    <p>
      Most browsers automatically accept cookies, but you can choose whether
      or not to accept cookies through your browser controls, often found in
      your browser&apos;s &quot;Tools&quot; or &quot;Preferences&quot; menu.
    </p>
    <p>
      Additionally, please note that blocking cookies may not completely
      prevent how we share information with third parties such as our
      advertising partners. To exercise your rights or opt-out of certain uses
      of your information by these parties, please follow the instructions in
      the &quot;Behavioural Advertising&quot; section above.
    </p>
    <h3 className="text-primary text-xl">Do Not Track</h3>
    <p>
      Please note that because there is no consistent industry understanding
      of how to respond to &quot;Do Not Track&quot; signals, we do not alter our data
      collection and usage practices when we detect such a signal from your
      browser.
    </p>
    <h2 className="text-primary text-2xl">Changes</h2>
    <p>
      We may update this Privacy Policy from time to time in order to reflect,
      for example, changes to our practices or for other operational, legal,
      or regulatory reasons.
    </p>
        <h2 className="text-primary text-2xl">Contact</h2>
    <p>
      For more information about our privacy practices, if you have questions,
      or if you would like to make a complaint, please contact us by e-mail at
      <Link
        className="text-info"
        href="mailto:support@flareseal.com"
        rel="noreferrer noopener"
        >
          support@flareseal.com
        </Link>
      or by mail using the details provided below:
    </p>
    <p>
      FlareSeal, LLC, 2840 West Bay Dr., Suite 109, Belleair Bluffs, FL.
      33770, United States Last updated: 12-30-2020
    </p>
  </div>
</main>
</>
)
}