+++
title = "Set up your tools"
weight = 1
+++

1. **Start with Pop!_OS 26.04 LTS.** It includes COSMIC, so you can test apps and applets in the same desktop environment your users will have. Another Linux distribution running COSMIC also works. [Download Pop!_OS 26.04 LTS](https://system76.com/download-pop/)
2. **Install Rust and the build tools.** Install a current stable Rust toolchain with [rustup](https://rustup.rs/). On Pop!_OS or Ubuntu, install the native dependencies with the command below. For another distribution, see the [libcosmic dependency guide](https://github.com/pop-os/libcosmic#dependencies).

   ```sh
   sudo apt install git build-essential cmake just pkgconf \
     libexpat1-dev libfontconfig-dev libfreetype-dev libxkbcommon-dev
   ```

3. **Install the project generator.** The templates use cargo-generate to substitute your project details and prepare the starter files.

   ```sh
   cargo install --locked cargo-generate
   rustc --version
   cargo generate --version
   just --version
   ```
