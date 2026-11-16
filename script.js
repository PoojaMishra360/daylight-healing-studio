// Edit these values before deploying.
var s = {
  upiId: "aonemarketing220-1@okicici",
  payeeName: "Delight Healing Studio",
  whatsapp: "919860402012",         // country code + number, no +
  communityLink: "https://chat.whatsapp.com/CR9CfHLvvHA75CtNM9x7DD",
  // Free key from https://web3forms.com (emails each registration to you)
  web3formsKey: "cdc8cb8a-64e5-4497-8273-3e028f239f49",
  // Free Cloudinary account: Cloud name + an UNSIGNED upload preset (Settings > Upload)
  cloudName: "zjy95a8u",
  uploadPreset: "delight"
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
    var file = form.querySelector("[name=screenshot]").files[0];
    if (!file) { msg.textContent = "Please upload your payment screenshot."; return; }
    if (file.size > 5 * 1024 * 1024) { msg.textContent = "Screenshot must be under 5 MB."; return; }
    data.delete("screenshot");
    data.append("access_key", s.web3formsKey);
    data.append("subject", "New registration – Delight Healing Studio");
    var btn = form.querySelector("button");
    btn.disabled = true; btn.textContent = "Submitting...";

    var up = new FormData();
    up.append("file", file);
    up.append("upload_preset", s.uploadPreset);

    fetch("https://api.cloudinary.com/v1_1/" + s.cloudName + "/image/upload", { method: "POST", body: up })
      .then(function (r) { return r.json(); })
      .then(function (u) {
        if (!u.secure_url) throw new Error("Upload failed");
        data.append("screenshot_url", u.secure_url);
        return fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      })
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
