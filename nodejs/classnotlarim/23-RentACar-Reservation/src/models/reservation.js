"use strict";

/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
/* ------------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");
const dateToLocaleString = require("../helpers/dateToLocaleString");

// Reservation Model:
const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      // `amount` değeri sistem tarafından hesaplanacak, manuel alınmayacak
      // required: true, gerekliyse buraya eklenebilir
    }
  },
  {
    collection: "reservations",
    timestamps: true, // createdAt ve updatedAt otomatik olarak eklenecek
  }
);

// Özelleştirilmiş JSON dönüşümü
ReservationSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;

    // Tarih formatlarını kullanıcı dostu hale getirmek
    ret.startDate = dateToLocaleString(ret.startDate);
    ret.endDate = dateToLocaleString(ret.endDate);
    ret.createdAt = dateToLocaleString(ret.createdAt);
    ret.updatedAt = dateToLocaleString(ret.updatedAt);

    // MongoDB'nin _v alanını çıkarmak
    delete ret._v;
  },
});

// Indexleme eklemek (örnek: daha hızlı sorgular için)
ReservationSchema.index({ userId: 1, carId: 1 }); // Kullanıcı ve araç kombinasyonuna göre index

// Export:
module.exports = mongoose.model("Reservation", ReservationSchema);
