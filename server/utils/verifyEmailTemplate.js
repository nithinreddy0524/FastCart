const verifyEmailTemplate = ({ name, url }) => {
  return `
  <div style="font-family: 'Poppins', Arial, sans-serif; background: #f7fbf9; padding: 24px; color: #0f5132;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(2,6,23,0.06);">
      <tr>
        <td style="background:linear-gradient(90deg,#10b981,#059669);padding:20px;display:flex;align-items:center;gap:12px;">
          <div style="width:44px;height:44px;border-radius:8px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-family:Poppins, Arial, sans-serif;">FAST</div>
          <div>
            <h1 style="margin:0;color:#fff;font-size:18px;font-weight:700;letter-spacing:0.2px">FastCart</h1>
            <div style="font-size:12px;color:rgba(255,255,255,0.9)">Please verify your email</div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:22px;">
          <p style="margin:0 0 12px 0;color:#0f5132;">Hi <strong>${name}</strong>,</p>
          <p style="margin:0 0 18px 0;color:#115e46;">Welcome to FastCart! Please verify your email address to complete registration and activate your account.</p>

          <div style="text-align:center;margin:18px 0;">
            <a href="${url}" style="display:inline-block;padding:12px 26px;border-radius:8px;background:linear-gradient(90deg,#10b981,#059669);color:#fff;font-weight:700;text-decoration:none;font-family:Poppins, Arial, sans-serif;">Verify Email</a>
          </div>

          <p style="margin:0 0 12px 0;color:#0f5132;">If you did not create an account, simply ignore this email or contact support.</p>

          <p style="margin:16px 0 0 0;color:#115e46;">Thanks,<br/><strong>The FastCart Team</strong></p>
        </td>
      </tr>
      <tr>
        <td style="background:#f3faf7;padding:14px 20px;font-size:12px;color:#0f5132;text-align:center;">
          Need help? Reply to this email or contact support at <a href="mailto:support@fastcart.example" style="color:#059669;text-decoration:none;">support@fastcart.com</a>
        </td>
      </tr>
    </table>
  </div>
  `
}

export default verifyEmailTemplate