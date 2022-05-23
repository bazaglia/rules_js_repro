load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@aspect_rules_swc//swc:swc.bzl", "swc")
load("@io_bazel_rules_docker//container:container.bzl", "container_image")
load("@rules_pkg//:pkg.bzl", "pkg_tar")
load("//:runfiles.bzl", "expand_runfiles")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")

swc(
    name = "transpile",
    srcs = ["index.ts"],
    data = [
        "@npm//@grpc/grpc-js",
        "@npm//@grpc/proto-loader",
    ],
    source_maps = True,
    swcrc = ".swcrc",
)

copy_to_bin(
    name = "proto",
    srcs = ["hello.proto"],
)

js_binary(
    name = "start",
    data = [
        ":proto",
        ":transpile",
    ],
    entry_point = "index.js",
)

# Docker

expand_runfiles(
    name = "runfiles",
    binary = ":start",
)

pkg_tar(
    name = "entrypoint",
    srcs = [":runfiles"],
    strip_prefix = ".",
)

container_image(
    name = "image",
    base = "@debian//image",
    cmd = "/services/hello-world/_start_launcher.sh",
    env = {"BAZEL_BINDIR": "/"},
    tars = [":entrypoint"],
)
