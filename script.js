const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = document.getElementById("generateBtn"),
  qrImg = wrapper.querySelector(".qr-code img"),
  downloadBtn = wrapper.querySelector(".download-btn");

let preValue;

// Generate QR code
generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = "Generating QR Code...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
  });
});

// Hide QR code when input is empty
qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
  }
});

// Download QR code
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = qrImg.src;
  link.download = "QRCode.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
