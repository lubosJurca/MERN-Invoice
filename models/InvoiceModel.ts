import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, required: true },
    description: { type: String, required: true },
    paymentTerms: { type: Number, required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    status: { type: String, required: true },
    senderAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postCode: { type: String },
      country: { type: String, required: true },
    },
    clientAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postCode: { type: String },
      country: { type: String, required: true },
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Invoice', InvoiceSchema);
