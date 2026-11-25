+++
title = "Build your first applet"
weight = 3
+++

1. **Generate the applet.** Use `hello-panel` when asked for a project name, or adjust the directory name below. Choose an app ID such as `io.github.yourname.HelloPanel` and fill in the description, license, and repository URL.

   ```sh
   cargo generate gh:pop-os/cosmic-applet-template
   cd hello-panel
   ```

   [Applet template](https://github.com/pop-os/cosmic-applet-template)

2. **Build and install it for your user.** The install recipe copies the binary, desktop entry, and icon under `~/.local`. Your COSMIC session needs `~/.local/bin` on its `PATH` to launch the applet.

   ```sh
   just
   just prefix="$HOME/.local" install
   ```

3. **Add it to the panel.** In **COSMIC Settings → Desktop → Panel**, open **Configure panel applets → Add applet** and choose your applet. You can also add it from the Dock settings. Click its icon to open the example popup. [System76’s guide to the Panel and Dock](https://support.system76.com/support/pop-basics#the-panel)

4. **Edit the popup.** In `src/app.rs`, `view` builds the panel button and `view_window` builds the popup. Change something in the popup, repeat the build and install commands, then remove and re-add the applet in Settings to launch the updated binary. [libcosmic guide to panel applets](https://pop-os.github.io/libcosmic-book/panel-applets.html)
