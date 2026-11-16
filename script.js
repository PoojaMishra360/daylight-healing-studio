// Edit these values before deploying.
var s = {
  upiId: "aonemarketing220-1@okicici",
  payeeName: "Delight Healing Studio",
  whatsapp: "919860402012",         // country code + number, no +
  communityLink: "https://chat.whatsapp.com/CR9CfHLvvHA75CtNM9x7DD",
  // Free key from https://web3forms.com (emails each registration to you)
  web3formsKey: "cdc8cb8a-64e5-4497-8273-3e028f239f49"
};

(function () {
  var upi = "upi://pay?pa=" + encodeURIComponent(s.upiId) +
    "&pn=" + encodeURIComponent(s.payeeName) + "&cu=INR";

  document.getElementById("upiLink").href = upi;
  document.getElementById("upiIdText").textContent = s.upiId;
  document.getElementById("communityLink").href = s.communityLink;
  document.getElementById("waBtn").href = "https://wa.me/" + s.whatsapp +
    "?text=" + encodeURIComponent("Hi, I'd like to know more about the healing sessions.");
  new QRCode(document.getElementById("qr"), { text: upi, width: 180, height: 180 });

  var form = document.getElementById("regForm");
  var msg = document.getElementById("msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    msg.textContent = "";
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var data = new FormData(form);
    if (data.get("botcheck")) return;
    data.append("access_key", s.web3formsKey);
    data.append("subject", "New registration – Delight Healing Studio");
    var btn = form.querySelector("button");
    btn.disabled = true; btn.textContent = "Submitting...";

    fetch("https://api.web3forms.com/submit", { method: "POST", body: data })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        if (!r.success) throw new Error(r.message || "Failed");
        window.location.href = "thank-you.html";
      })
      .catch(function () {
        msg.textContent = "Could not submit. Please WhatsApp us your payment screenshot.";
        btn.disabled = false; btn.textContent = "Submit Registration";
      });
  });
})();
