+++
title = "Publishing and submission"
weight = 4
+++

Submit standalone desktop apps to **Flathub**. Submit Panel and Dock applets to System76’s **COSMIC Flatpak** repository. Both routes start with a working Flatpak manifest, and both are separate from listing a project in COSMIC Orbit. [libcosmic publishing guidance](https://github.com/pop-os/libcosmic#publishing)

## Submit an application to Flathub

1. **Prepare a release.** Tag a version of your app and build a Flatpak manifest that points to the release’s source. Use a supported runtime, include the Cargo dependencies needed for an offline build, and keep the app ID consistent across the manifest, desktop entry, icon, and AppStream metadata. [Flathub requirements](https://docs.flathub.org/docs/for-app-authors/requirements)
2. **Build, launch, and lint the package.** Replace the example app ID and manifest filename with yours. Open the packaged app and test its main features before filing a pull request. [Flathub build and lint instructions](https://docs.flathub.org/docs/for-app-authors/submission#build-and-install)

   ```sh
   flatpak remote-add --if-not-exists --user flathub https://dl.flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.flatpak.Builder

   flatpak run --command=flathub-build org.flatpak.Builder --install io.github.yourname.HelloCosmic.yml
   flatpak run io.github.yourname.HelloCosmic
   flatpak run --command=flatpak-builder-lint org.flatpak.Builder manifest io.github.yourname.HelloCosmic.yml
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
