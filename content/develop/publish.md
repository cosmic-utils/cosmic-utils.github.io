+++
title = "Publishing and submission"
weight = 5
+++

Submit standalone desktop apps to **Flathub**. Submit Panel and Dock applets to System76’s **COSMIC Flatpak** repository. Both routes start with a working Flatpak manifest, and both are separate from listing a project in COSMIC Orbit. [libcosmic publishing guidance](https://github.com/pop-os/libcosmic#publishing)

## Submit an application to Flathub

1. **Prepare a release.** Tag a version of your app and build a Flatpak manifest that points to the release’s source. Use a supported runtime, include the Cargo dependencies needed for an offline build, and keep the app ID consistent across the manifest, desktop entry, icon, and AppStream metadata. [Flathub requirements](https://docs.flathub.org/docs/for-app-authors/requirements)
   This example packages the [Hello COSMIC app](@/develop/app.md) using System76’s COSMIC BaseApp. Save it as `flatpak/io.github.yourname.HelloCosmic.json` inside the source checkout for a local build. From the `hello-cosmic` project root, put the manifest and generated Cargo sources in `flatpak/`. The app template generates the desktop entry and AppStream metadata during the Cargo build. These paths match the [template’s install recipe](https://github.com/pop-os/cosmic-app-template/blob/master/justfile).

   ```json
   {
     "$schema": "https://raw.githubusercontent.com/flatpak/flatpak-builder/main/data/flatpak-manifest.schema.json",
     "id": "io.github.yourname.HelloCosmic",
     "runtime": "org.freedesktop.Platform",
     "runtime-version": "26.08",
     "base": "com.system76.Cosmic.BaseApp",
     "base-version": "stable",
     "sdk": "org.freedesktop.Sdk",
     "sdk-extensions": [
       "org.freedesktop.Sdk.Extension.rust-stable"
     ],
     "command": "hello-cosmic",
     "finish-args": [
       "--share=ipc",
         "--socket=wayland",
       "--socket=fallback-x11",
       "--device=dri",
       "--talk-name=com.system76.CosmicSettingsDaemon.*",
       "--talk-name=com.system76.CosmicSettingsDaemon",
       "--filesystem=xdg-config/cosmic:ro"
     ],
     "build-options": {
       "append-path": "/usr/lib/sdk/rust-stable/bin"
     },
     "modules": [
       {
         "name": "hello-cosmic",
         "buildsystem": "simple",
         "build-options": {
           "env": {
             "CARGO_HOME": "/run/build/hello-cosmic/cargo"
           }
         },
         "build-commands": [
           "cargo --offline fetch --manifest-path Cargo.toml --verbose",
           "cargo --offline build --release --locked --verbose",
           "install -Dm0755 ./target/release/hello-cosmic /app/bin/hello-cosmic",
           "install -Dm0644 ./target/xdgen/app.desktop /app/share/applications/io.github.yourname.HelloCosmic.desktop",
           "install -Dm0644 ./target/xdgen/app.metainfo.xml /app/share/metainfo/io.github.yourname.HelloCosmic.metainfo.xml",
           "install -Dm0644 ./resources/icons/hicolor/scalable/apps/icon.svg /app/share/icons/hicolor/scalable/apps/io.github.yourname.HelloCosmic.svg"
         ],
         "sources": [
           {
             "type": "dir",
             "path": "..",
             "skip": [
               ".cargo",
               ".git",
               ".flatpak-builder",
               "dist",
               "target",
               "vendor",
               "vendor.tar"
             ]
           },
           "cargo-sources.json"
         ]
       }
     ]
   }
   ```

   **Flathub lint exception.** The `--filesystem=xdg-config/cosmic:ro` permission requires a lint exception for `finish-args-unnecessary-xdg-config-cosmic-ro-access`. If your app needs it, open a pull request to Flathub’s linter exception list and explain which COSMIC settings the app reads and why it needs access. Explain the permission in your app submission too, since Flathub reviews permissions separately. [Flathub lint exceptions](https://docs.flathub.org/docs/for-app-authors/linter#exceptions)

   Use [Flatpak’s Cargo source generator](https://github.com/flatpak/flatpak-builder-tools/tree/master/cargo) on the release’s `Cargo.lock` and put `cargo-sources.json` beside the manifest. For the Flathub submission, replace the local `dir` source with a `git` source that specifies your repository URL, release tag, and full commit SHA. Keep the generated Cargo sources in the list so the build can run offline. [Flatpak Builder source types](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)

2. **Build, launch, and lint the package.** Run these commands from the directory containing the manifest, using your own app ID and manifest filename. Open the packaged app and test its main features before filing a pull request. [Flathub build and lint instructions](https://docs.flathub.org/docs/for-app-authors/submission#build-and-install)

   ```sh
   flatpak remote-add --if-not-exists --user flathub https://dl.flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.flatpak.Builder

   flatpak run --command=flathub-build org.flatpak.Builder --install io.github.yourname.HelloCosmic.json
   flatpak run io.github.yourname.HelloCosmic
   flatpak run --command=flatpak-builder-lint org.flatpak.Builder manifest io.github.yourname.HelloCosmic.json
   ```

3. **Open a submission pull request.** Fork [flathub/flathub](https://github.com/flathub/flathub) with **Copy the master branch only** unchecked. Create a branch from `new-pr`, add your manifest and its supporting files, then commit and push. On GitHub, target Flathub’s `new-pr` branch and title the PR `Add io.github.yourname.HelloCosmic`, substituting your app ID. Fill in the PR template and explain any permissions the app needs. [Flathub pull request instructions](https://docs.flathub.org/docs/for-app-authors/submission#submission-pr)
4. **Follow the review.** Address feedback by pushing updates to the same branch. After approval, Flathub creates a repository for your app and invites you to maintain it. [Flathub maintenance guide](https://docs.flathub.org/docs/for-app-authors/maintenance)

## Submit an applet to COSMIC Flatpak

1. **Prepare the applet release.** Tag a release and create a JSON Flatpak manifest that builds it from pinned sources. Include the Cargo source list or other files needed to build offline. Ensure the packaged desktop entry contains `X-CosmicApplet=true` so COSMIC Settings can discover it. [Panel applet desktop entries](https://pop-os.github.io/libcosmic-book/panel-applets.html)
2. **Add the manifest to your fork.** Fork [pop-os/cosmic-flatpak](https://github.com/pop-os/cosmic-flatpak) and branch from `master`. Put the manifest at `app/<app-id>/<app-id>.json` and any supporting files, such as `cargo-sources.json`, beside it. [Example merged applet submission](https://github.com/pop-os/cosmic-flatpak/pull/70)
3. **Build and test on COSMIC.** Run these commands from your fork. On Pop!_OS or Ubuntu, install the build tools first if needed. Replace the example app ID with yours. Then add the packaged applet through Panel or Dock settings and check that its icon and popup work. [COSMIC Flatpak build instructions](https://github.com/pop-os/cosmic-flatpak#readme)

   ```sh
   sudo apt install flatpak flatpak-builder just
   flatpak remote-add --if-not-exists --user flathub https://dl.flathub.org/repo/flathub.flatpakrepo

   just build io.github.yourname.HelloPanel
   flatpak install --user ./repo io.github.yourname.HelloPanel
   ```

4. **Open a pull request against `master`.** Commit and push the manifest and supporting files, then open a PR to `pop-os/cosmic-flatpak`. Include the upstream repository, release version, and what you tested. Respond to review feedback on the same PR. [COSMIC Flatpak pull requests](https://github.com/pop-os/cosmic-flatpak/pulls)

## List your project in COSMIC Orbit

Open the [COSMIC Orbit submission form](@/contribute.md), select the project type, and enter the name, description, repository URL, direct icon URL, and developer name. The form prepares a JSON file in GitHub. Use **Propose changes** or commit to a new branch, then create the pull request for the catalog maintainers to review.
