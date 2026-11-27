const iconPreview = document.querySelector("#icon-preview");
const iconFile = iconPreview.querySelector("#icon-preview-file");
const iconFilename = iconPreview.querySelector("#icon-preview-filename");
const iconStatus = iconPreview.querySelector("#icon-preview-status");
const iconResults = iconPreview.querySelector("#icon-preview-results");
const comparison = iconPreview.querySelector(".icon-preview-comparison");
const previewImages = [];
let previewUrl;

for (const panel of iconResults.querySelectorAll(".icon-guide-sizes")) {
  for (const size of [24, 48, 96]) {
    const sample = document.createElement("span");
    const image = new Image(size, size);
    image.alt = "";
    sample.append(image, `${size} px`);
    panel.append(sample);
    previewImages.push(image);
  }
}

const comparisonImage = new Image(48, 48);
comparisonImage.alt = "Your icon";
comparison.append(comparisonImage);
previewImages.push(comparisonImage);

for (const stockIcon of document.querySelectorAll(".icon-guide-lineup img")) {
  const image = stockIcon.cloneNode();
  image.width = 48;
  image.height = 48;
  image.alt = stockIcon.parentElement.title;
  comparison.append(image);
}

iconFile.addEventListener("change", async () => {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = undefined;
  iconResults.hidden = true;
  iconFilename.textContent = "";
  iconStatus.textContent = "";

  const file = iconFile.files[0];
  if (!file) return;
  if (!/\.(svg|png)$/i.test(file.name)) {
    iconFile.value = "";
    iconStatus.textContent = "Choose an SVG or PNG file.";
    return;
  }

  const url = URL.createObjectURL(file);
  previewUrl = url;
  const trial = new Image();
  trial.src = url;

  try {
    await trial.decode();
  } catch {
    if (previewUrl !== url) return;
    URL.revokeObjectURL(url);
    previewUrl = undefined;
    iconFile.value = "";
    iconStatus.textContent = "This image could not be opened. Choose a valid SVG or PNG file.";
    return;
  }

  if (previewUrl !== url) return;
  for (const image of previewImages) image.src = url;
  iconFilename.textContent = file.name;
  iconResults.hidden = false;
});
