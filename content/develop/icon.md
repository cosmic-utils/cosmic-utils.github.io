+++
title = "Design your icon"
weight = 4
+++

Your launcher icon needs to be recognizable in the Dock and Applications Library, even when it’s small. Compare it with the stock COSMIC icons as you work.

## Use stock COSMIC icons as references

COSMIC icons don’t all share one outline: some depict objects, while others use a screen or frame. Pick a reference close to what you’re drawing and look at its proportions, colors, and spacing.

<figure class="icon-guide-figure">
<div class="icon-guide-lineup">
  <a href="https://github.com/pop-os/cosmic-files/blob/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicFiles.svg" title="COSMIC Files"><img src="https://raw.githubusercontent.com/pop-os/cosmic-files/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicFiles.svg" width="96" height="96" alt="COSMIC Files SVG on GitHub"></a>
  <a href="https://github.com/pop-os/cosmic-player/blob/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicPlayer.svg" title="COSMIC Media Player"><img src="https://raw.githubusercontent.com/pop-os/cosmic-player/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicPlayer.svg" width="96" height="96" alt="COSMIC Media Player SVG on GitHub"></a>
  <a href="https://github.com/pop-os/cosmic-settings/blob/HEAD/resources/icons/128x128/apps/com.system76.CosmicSettings.svg" title="COSMIC Settings"><img src="https://raw.githubusercontent.com/pop-os/cosmic-settings/HEAD/resources/icons/128x128/apps/com.system76.CosmicSettings.svg" width="96" height="96" alt="COSMIC Settings SVG on GitHub"></a>
  <a href="https://github.com/pop-os/cosmic-store/blob/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicStore.svg" title="COSMIC Store"><img src="https://raw.githubusercontent.com/pop-os/cosmic-store/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicStore.svg" width="96" height="96" alt="COSMIC Store SVG on GitHub"></a>
  <a href="https://github.com/pop-os/cosmic-term/blob/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicTerm.svg" title="COSMIC Terminal"><img src="https://raw.githubusercontent.com/pop-os/cosmic-term/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicTerm.svg" width="96" height="96" alt="COSMIC Terminal SVG on GitHub"></a>
  <a href="https://github.com/pop-os/cosmic-edit/blob/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicEdit.svg" title="COSMIC Text Editor"><img src="https://raw.githubusercontent.com/pop-os/cosmic-edit/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicEdit.svg" width="96" height="96" alt="COSMIC Text Editor SVG on GitHub"></a>
  <a href="https://github.com/pop-os/cosmic-monitor/blob/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicMonitor.svg" title="COSMIC Monitor"><img src="https://raw.githubusercontent.com/pop-os/cosmic-monitor/HEAD/res/icons/hicolor/128x128/apps/com.system76.CosmicMonitor.svg" width="96" height="96" alt="COSMIC Monitor SVG on GitHub"></a>
</div>
<figcaption>Stock COSMIC launcher icons by <a href="https://system76.com/">System76</a>.</figcaption>
</figure>

## Build the icon

Start with the outline. Sketch a familiar object or a simple mark related to the app’s function as a single filled shape. If the app already has a recognizable mark, keep it. The folder tab in Files and the pen extending past Text Editor’s page are useful examples of distinctive outlines.

Decide which detail should stand out. Media Player’s white play triangle and Terminal’s yellow prompt are easy to pick out against their dark backgrounds. Use size or contrast to draw attention to your main detail, and remove smaller decorations that compete with it.

Choose colors that keep adjacent parts distinct. A darker rear layer, like the one in Files, can separate overlapping shapes. Shading can give an object depth; for frames and bezels, use a solid fill or stroke.

Compare your icon with stock icons in equal-size preview boxes. A thin shape can look smaller than a solid one with the same dimensions, so don’t rely on matching their bounds. Adjust the scale by eye and move asymmetrical artwork if it looks off-center.

## Start from an SVG template

<div class="icon-guide-templates">
  <figure>
    <img src="/images/icon-guide/launcher-template.svg" width="96" height="96" alt="Compass with a red-tipped needle and four cardinal tick marks on an ivory dial with a brass rim.">
    <figcaption>A circular dial for round objects like a compass.<br><a href="/images/icon-guide/launcher-template.svg" download aria-label="Download round SVG">Download</a></figcaption>
  </figure>
  <figure>
    <img src="/images/icon-guide/launcher-template-square.svg" width="96" height="96" alt="Blue-gray audio mixer with one dark blue fader and one coral-red fader.">
    <figcaption>A rounded-square audio mixer.<br><a href="/images/icon-guide/launcher-template-square.svg" download aria-label="Download rounded square SVG">Download</a></figcaption>
  </figure>
  <figure>
    <img src="/images/icon-guide/launcher-template-landscape.svg" width="96" height="96" alt="Pink audio waveform on a plum screen with a lavender bezel.">
    <figcaption>A wide screen with an audio waveform.<br><a href="/images/icon-guide/launcher-template-landscape.svg" download aria-label="Download landscape SVG">Download</a></figcaption>
  </figure>
</div>

Open the SVG in a vector editor and replace the **Silhouette** and **Main detail** layers with your own artwork.

Each template has a top-to-bottom gradient on its main surface. Change the gradient stops to suit your palette.

## Examples

These launcher icons come from COSMIC Orbit apps.

<figure class="icon-guide-figure">
  <div class="icon-guide-samples">
    <div class="icon-guide-sample icon-guide-sample--light">
      <span>Light background</span>
      <div class="icon-guide-sizes">
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-mail/main/resources/icons/hicolor/scalable/apps/icon.svg" width="24" height="24" alt="">24 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-mail/main/resources/icons/hicolor/scalable/apps/icon.svg" width="48" height="48" alt="">48 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-mail/main/resources/icons/hicolor/scalable/apps/icon.svg" width="96" height="96" alt="">96 px</span>
      </div>
    </div>
    <div class="icon-guide-sample icon-guide-sample--dark">
      <span>Dark background</span>
      <div class="icon-guide-sizes">
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-mail/main/resources/icons/hicolor/scalable/apps/icon.svg" width="24" height="24" alt="">24 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-mail/main/resources/icons/hicolor/scalable/apps/icon.svg" width="48" height="48" alt="">48 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-mail/main/resources/icons/hicolor/scalable/apps/icon.svg" width="96" height="96" alt="">96 px</span>
      </div>
    </div>
  </div>
  <figcaption>Mail’s pale letter contrasts with the envelope. <a href="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-mail/main/resources/icons/hicolor/scalable/apps/icon.svg">View the Mail SVG</a></figcaption>
</figure>

<figure class="icon-guide-figure">
  <div class="icon-guide-samples">
    <div class="icon-guide-sample icon-guide-sample--light">
      <span>Light background</span>
      <div class="icon-guide-sizes">
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-calendar/main/resources/icons/hicolor/scalable/apps/icon.svg" width="24" height="24" alt="">24 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-calendar/main/resources/icons/hicolor/scalable/apps/icon.svg" width="48" height="48" alt="">48 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-calendar/main/resources/icons/hicolor/scalable/apps/icon.svg" width="96" height="96" alt="">96 px</span>
      </div>
    </div>
    <div class="icon-guide-sample icon-guide-sample--dark">
      <span>Dark background</span>
      <div class="icon-guide-sizes">
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-calendar/main/resources/icons/hicolor/scalable/apps/icon.svg" width="24" height="24" alt="">24 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-calendar/main/resources/icons/hicolor/scalable/apps/icon.svg" width="48" height="48" alt="">48 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-calendar/main/resources/icons/hicolor/scalable/apps/icon.svg" width="96" height="96" alt="">96 px</span>
      </div>
    </div>
  </div>
  <figcaption>Calendar’s orange date stands out against the grid. <a href="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-calendar/main/resources/icons/hicolor/scalable/apps/icon.svg">View the Calendar SVG</a></figcaption>
</figure>

<figure class="icon-guide-figure">
  <div class="icon-guide-samples">
    <div class="icon-guide-sample icon-guide-sample--light">
      <span>Light background</span>
      <div class="icon-guide-sizes">
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-boards/main/resources/icons/hicolor/scalable/apps/icon.svg" width="24" height="24" alt="">24 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-boards/main/resources/icons/hicolor/scalable/apps/icon.svg" width="48" height="48" alt="">48 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-boards/main/resources/icons/hicolor/scalable/apps/icon.svg" width="96" height="96" alt="">96 px</span>
      </div>
    </div>
    <div class="icon-guide-sample icon-guide-sample--dark">
      <span>Dark background</span>
      <div class="icon-guide-sizes">
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-boards/main/resources/icons/hicolor/scalable/apps/icon.svg" width="24" height="24" alt="">24 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-boards/main/resources/icons/hicolor/scalable/apps/icon.svg" width="48" height="48" alt="">48 px</span>
        <span><img src="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-boards/main/resources/icons/hicolor/scalable/apps/icon.svg" width="96" height="96" alt="">96 px</span>
      </div>
    </div>
  </div>
  <figcaption>The gaps between Boards’ three columns remain visible at the smallest size. <a href="https://raw.githubusercontent.com/cosmic-ext-orbit/cosmic-ext-boards/main/resources/icons/hicolor/scalable/apps/icon.svg">View the Boards SVG</a></figcaption>
</figure>

## Draw and test the SVG

1. **Draw on a square canvas.** Use a square SVG `viewBox`, leave transparent space around the artwork, and make the SVG self-contained so it renders without external fonts or images. Follow your project’s asset conventions when choosing dimensions and padding.
2. **Render at 24, 48, and 96 pixels.** Preview each size on light and dark backgrounds. At the smallest size, check that the icon is recognizable and that thin details and gaps haven’t disappeared. Merge or remove details that blur together. At larger sizes, look for strokes or shadows clipped by the canvas.
3. **Check it in COSMIC.** Install the app, then find it in the Dock and Applications Library. Check its size against neighboring launchers and whether it’s easy to spot.

## Preview your own icon

<div id="icon-preview">
  <p id="icon-preview-help">Choose a self-contained SVG or a PNG to compare it with stock COSMIC icons. Your file stays in your browser.</p>
  <div class="icon-preview-picker">
    <input id="icon-preview-file" type="file" accept=".svg,.png,image/svg+xml,image/png" aria-describedby="icon-preview-help">
    <label for="icon-preview-file" class="button button-primary">Choose an icon...</label>
    <span id="icon-preview-filename"></span>
  </div>
  <p id="icon-preview-status" role="status"></p>
  <div id="icon-preview-results" hidden>
    <div class="icon-guide-samples">
      <div class="icon-guide-sample icon-guide-sample--light">
        <span>Light background</span>
        <div class="icon-guide-sizes"></div>
      </div>
      <div class="icon-guide-sample icon-guide-sample--dark">
        <span>Dark background</span>
        <div class="icon-guide-sizes"></div>
      </div>
    </div>
    <figure class="icon-guide-figure">
      <figcaption id="icon-preview-comparison-label">Your icon beside stock COSMIC icons at 48 px</figcaption>
      <div class="icon-preview-comparison" role="region" aria-labelledby="icon-preview-comparison-label" tabindex="0"></div>
    </figure>
  </div>
  <noscript><p>Enable JavaScript to preview your icon.</p></noscript>
</div>
<script src="/js/icon-preview.js" defer></script>

## Install the launcher icon

If you started from the [COSMIC app template](@/develop/app.md), replace `resources/icons/hicolor/scalable/apps/icon.svg`. The template installs it as `<app-id>.svg` under `share/icons/hicolor/scalable/apps/` in your install prefix. The desktop entry’s `Icon=` value should match that installed filename without `.svg`. If your project generates its desktop entry, check the source template as well. 

[Template install recipe](https://github.com/pop-os/cosmic-app-template/blob/main/justfile) · [Freedesktop Icon Theme Specification](https://xdg.pages.freedesktop.org/xdg-specs/icon-theme/latest/)
