# ROCm 3.8 Environment for HSACO File Generation

This guide explains how to set up a **ROCm 3.8 environment** inside a Docker container and use it to compile OpenCL (`.cl`) source files into `.hsaco` binaries.  
This approach ensures a consistent, reproducible build environment — ideal for legacy ROCm-based workflows and GPU kernel development.

---

## 🧩 Overview

ROCm (Radeon Open Compute) provides the compiler and runtime stack for AMD GPUs.  
The **`clang-ocl`** tool is used to compile OpenCL (`.cl`) source code into **HSACO** (HSA Code Object) files that can be loaded by AMD GPUs.

This guide uses:

- **Host System:** Ubuntu 20.04 / 22.04 (or compatible Linux)
- **Docker Image:** `rocm/dev-ubuntu-18.04:3.8`
- **Goal:** Compile `.cl` → `.hsaco`

---

## 📦 1. Prerequisites

Before starting, make sure the following are installed on your host system:

| Requirement | Description |
|--------------|-------------|
| **Docker** | Installed and running (`docker --version`) |
| **AMD GPU** | Supported by ROCm 3.8 (e.g., Polaris, Vega) |
| **Internet Access** | Needed to pull the ROCm Docker image |

---

## 🚀 2. Pull the ROCm 3.8 Docker Image

Run the following command to download the official ROCm 3.8 development image:

```bash
docker pull rocm/dev-ubuntu-18.04:3.8
```

---

## 🧱 3. Launch the Docker Container

Start a new container with interactive terminal access:

```bash
docker run -it --name rocm38-dev rocm/dev-ubuntu-18.04:3.8 /bin/bash
```

After this command, you’ll be inside a clean Ubuntu 18.04 environment with the ROCm 3.8 toolchain preinstalled at `/opt/rocm-3.8.0`.

---

## 📂 4. Copy Your `.cl` File into the Container

Assuming your OpenCL source file is named `attention.cl` and located in your current directory:

```bash
docker cp attention.cl rocm38-dev:/workspace/attention.cl
```

---

## ⚙️ 5. Compile `.cl` to `.hsaco`

Run the following inside the container (you can either execute interactively or via `docker exec`):

```bash
/opt/rocm-3.8.0/bin/clang-ocl -mcpu=gfx803 -c /workspace/attention.cl -o /workspace/attention.hsaco
```

**Notes:**
- The `-mcpu` flag specifies your GPU architecture.  
  Common options:
  - `gfx803` → Polaris
  - `gfx900` → Vega 10
  - `gfx906` → Vega 20
- The output will be a `.hsaco` file located in `/workspace`.

---

## 📤 6. Copy the Generated `.hsaco` File to Host

Use the following command to bring the compiled file out of the container:

```bash
docker cp rocm38-dev:/workspace/attention.hsaco ./
```

After this step, `attention.hsaco` will appear in your host directory.

---

## 🧹 7. (Optional) Clean Up Temporary Files

You can remove intermediate files inside the container to keep it tidy:

```bash
docker exec rocm38-dev rm -f /workspace/attention.cl /workspace/attention.hsaco
```

---

## 🧾 8. Verify Successful Compilation

On your host machine, check for the `.hsaco` file:

```bash
ls | grep attention.hsaco
```

If the file appears, the compilation was successful ✅

---

## 🧰 9. Common Issues & Troubleshooting

| Issue | Possible Cause | Solution |
|--------|----------------|-----------|
| `clang-ocl: command not found` | ROCm not installed or wrong path | Verify `/opt/rocm-3.8.0/bin/` exists |
| `permission denied` | Limited container permissions | Add `sudo` or use root shell |
| `invalid mcpu` | Unsupported GPU target | Replace `gfx803` with correct architecture |
| `network error` | Docker image pull failed | Retry with `--network host` |

---


## 📚 References

- [ROCm GitHub Repository](https://github.com/RadeonOpenCompute/ROCm)
- [ROCm 3.8 Documentation (Archive)](https://rocmdocs.amd.com/en/latest/)
- [clang-ocl Command Reference](https://llvm.org/docs/)

---

**Author:**  
Shandong University — GPU Memory Optimization Team  
**Purpose:**  
To provide a reproducible environment for compiling `.cl` → `.hsaco` under ROCm 3.8.
