{
  description = "nix-container";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable"; # Use unstable for better chromium support
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            chromium
            glib
            gnumake
            python3
            python313Packages.pytest
            python313Packages.pyyaml
          ];

          shellHook = ''
            # 1. Tell Puppeteer NOT to download its own chromium
            export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
            
            # 2. Point to the Nix-provided Chromium
            export PUPPETEER_EXECUTABLE_PATH=${pkgs.chromium}/bin/chromium
            
            # 3. Specifically for resume-cli
            export RESUME_PUPPETEER_EXECUTABLE_PATH=${pkgs.chromium}/bin/chromium
            
            # 4. Ensure the dynamic linker can find glib if something calls it directly
            export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath [ pkgs.glib pkgs.nss pkgs.nspr ]}:$LD_LIBRARY_PATH
          '';
        };
      }
    );
}
