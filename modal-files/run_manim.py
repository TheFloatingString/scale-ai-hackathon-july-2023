import modal

stub = modal.Stub("example-manim")

stub_image = modal.Image.debian_slim(
        python_version="3.10"
).run_commands(
    "apt-get install -y software-properties-common",
    "apt-add-repository non-free",
    "apt-add-repository contrib",
    "apt-get update",
    "pip install manim"
)
