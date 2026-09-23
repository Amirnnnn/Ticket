const avatarInput = document.querySelector("#avatar-upload");
const uploadContainer = document.querySelector("#upload-container");
const uploadIcon = document.querySelector("#upload-icon");
const uploadText = document.querySelector("#upload-text");
const avatarPreview = document.querySelector("#avatar-preview");

function showAvatarPreview(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    avatarPreview.src = reader.result;
    avatarPreview.hidden = false;
    uploadIcon.hidden = true;
    uploadText.hidden = true;
  });
  reader.readAsDataURL(file);
}

function resetAvatarPreview() {
  avatarPreview.hidden = true;
  avatarPreview.src = "";
  uploadIcon.hidden = false;
  uploadText.hidden = false;
}

function handleAvatarFile(file) {
  if (!file) return;

  if (file.size > 500 * 1024) {
    alert("Please upload an image smaller than 500KB.");
    avatarInput.value = "";
    resetAvatarPreview();
    return;
  }

  showAvatarPreview(file);
}

if (avatarInput && uploadContainer) {
  // click to upload
  uploadContainer.addEventListener("click", () => {
    avatarInput.click();
  });

  // file selected via file dialog
  avatarInput.addEventListener("change", () => {
    handleAvatarFile(avatarInput.files[0]);
  });

  // drag and drop
  uploadContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadContainer.classList.add("drag-over");
  });

  uploadContainer.addEventListener("dragleave", () => {
    uploadContainer.classList.remove("drag-over");
  });

  uploadContainer.addEventListener("drop", (event) => {
    event.preventDefault();
    uploadContainer.classList.remove("drag-over");

    const file = event.dataTransfer.files[0];
    if (file) {
      avatarInput.files = event.dataTransfer.files;
      handleAvatarFile(file);
    }
  });
}
const form = document.querySelector("#ticket-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const avatar = document.querySelector("#avatar-upload").files[0];
    if (avatar && avatar.size > 500 * 1024) {
      alert("Please upload an image smaller than 500KB.");
      return;
    }

    const ticket = {
      name: document.querySelector("#name").value.trim(),
      email: document.querySelector("#email").value.trim(),
      github: document.querySelector("#github").value.trim(),
      avatar: "../assets/images/image-avatar.jpg",
    };

    const goToTicket = () => {
      localStorage.setItem("ticket", JSON.stringify(ticket));
      window.location.href = "./pages/page2.html";
    };

    if (avatar) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        ticket.avatar = reader.result;
        goToTicket();
      });
      reader.readAsDataURL(avatar);
    } else {
      goToTicket();
    }
  });
}

const savedTicket = JSON.parse(localStorage.getItem("ticket") || "null");
if (savedTicket && !form) {
  document.querySelectorAll("#name-html").forEach((element) => {
    element.textContent = savedTicket.name;
  });
  document.querySelector("#email-html").textContent = savedTicket.email;
  document.querySelector("#github-html").textContent =
    `@${savedTicket.github.replace(/^@/, "")}`;
  document.querySelector(".ticket-body img").src = savedTicket.avatar;
}
