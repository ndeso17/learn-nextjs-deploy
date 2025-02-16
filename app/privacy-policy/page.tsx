const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: 16 Februari 2025</p>
      <p>
        This Privacy Policy explains how we collect, use, and protect your
        information when you use our website or services.
      </p>
      <h2>1. Information We Collect</h2>
      <p>We collect your email and name when you sign in using Google OAuth.</p>
      <h2>2. How We Use Your Information</h2>
      <p>
        We use your information to authenticate you and improve our services.
      </p>
      <h2>3. Third-Party Services</h2>
      <p>
        We use Google OAuth for authentication. Read Google&apos;s policy{" "}
        <a href="https://policies.google.com/privacy">here</a>.
      </p>
      <h2>4. Contact Us</h2>
      <p>
        If you have questions, contact us at{" "}
        <a
          href="https://github.com/ndeso17"
          className="text-gray-700 font-bold"
        >
          ndeso17
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
