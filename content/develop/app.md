+++
title = "Build your first app"
weight = 2
+++

1. **Generate the project.** Run the following from the directory where you keep your projects. When prompted, use `hello-cosmic` as the project name, or adjust the `cd` command to match the name you choose.

   ```sh
   cargo generate gh:pop-os/cosmic-app-template
   cd hello-cosmic
   ```

   Pick a unique reverse-domain app ID such as `io.github.yourname.HelloCosmic`. Enter your own description, an SPDX license identifier such as `MIT`, and the URL you plan to use for your repository. [App template](https://github.com/pop-os/cosmic-app-template)

2. **Run the starter app.** This builds the project and opens its example window.

   ```sh
   cargo run
   ```

3. **Make a visible change.** Open `src/app.rs`, find `fn view`, and change a visible string such as the example’s `"Watch: "` label on the first page. Close the window and run `cargo run` again to see your edit.
