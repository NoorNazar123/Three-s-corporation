import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fields: any = {};
    const attachments: any[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size > 0) {
          const buffer = Buffer.from(await value.arrayBuffer());
          attachments.push({ filename: value.name, content: buffer });
        }
      } else {
        fields[key] = value;
      }
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions: any = {
      from: `Website Form Submission <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Order from ${fields.userName || fields.fullName || fields.firstName}`,
      html: `
        <h2>New Submission</h2>
        <p><strong>Name:</strong> ${fields.userName || fields.fullName || `${fields.firstName} ${fields.lastName}`}</p>
        <p><strong>Email:</strong> ${fields.email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${fields.phoneNumber || fields.phone || 'N/A'}</p>
        <p><strong>Product/Service:</strong> ${fields.variant || fields.service || 'N/A'}</p>
        <p><strong>Quantity:</strong> ${fields.quantity || 'N/A'}</p>
        <p><strong>Address:</strong> ${fields.address || fields.country || 'N/A'}</p>
        <p><strong>Message:</strong> ${fields.message || 'N/A'}</p>
        <p><strong>Files:</strong> ${attachments.length > 0 ? attachments.map((a) => a.filename).join(', ') : 'No files attached'}</p>
      `,
      attachments, // will be empty if no files
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process form submission',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
