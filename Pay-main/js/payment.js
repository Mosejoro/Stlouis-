const paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", payWithPaystack, false);

// Fee structure
const FEES = {
  nursery: 100,
  primary: 50000,
};

function updateAmount() {
  const classSelect = document.getElementById("class");
  const paymentType = document.getElementById("payment-type");
  const amountInput = document.getElementById("amount");

  if (classSelect.value && paymentType.value) {
    let baseAmount = classSelect.value.startsWith("nur")
      ? FEES.nursery
      : FEES.primary;
    let finalAmount =
      paymentType.value === "half" ? baseAmount / 2 : baseAmount;
    amountInput.value = finalAmount.toFixed(2);
  }
}

function payWithPaystack(e) {
  e.preventDefault();

  // Gather all form data
  const formData = {
    email: document.getElementById("email-address").value,
    studentName: document.getElementById("student-name").value,
    class: document.getElementById("class").value,
    term: document.getElementById("term").value,
    paymentType: document.getElementById("payment-type").value,
    amount: document.getElementById("amount").value,
  };

  // Generate reference
  const reference = `${formData.studentName.replace(
    /\s+/g,
    ""
  )}-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

  let handler = PaystackPop.setup({
    key: "pk_live_2e57947c4049ce5ffba1eba23d52af13e7927faf",
    email: formData.email,
    amount: parseFloat(formData.amount) * 100,
    currency: "NGN",
    ref: reference,
    onClose: function () {
      alert("Payment window closed.");
    },
    callback: function (response) {
      // Save to Google Sheets
      const paymentData = {
        ...formData,
        reference: response.reference,
        status: "success",
        date: new Date().toISOString(),
      };

      // Send data to Google Sheets
      fetch(
        "https://script.google.com/macros/s/AKfycbz19UMZ3O4vqIR5MyvDWiyvDgY8Qf3z8pQ8E-m3T9DAdxvtSKWIVNKbVKFejCX7o4SH/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      )
        .then(() => {
          // Redirect to thank you page
          window.location.href = `thank-you.html?ref=${response.reference}`;
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          // Still redirect to thank you page even if saving fails
          window.location.href = `thank-you.html?ref=${response.reference}`;
        });
    },
  });

  handler.openIframe();
}
