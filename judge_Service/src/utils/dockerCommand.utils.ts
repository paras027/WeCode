export default function dockerOptions(memoryLimit: number) {
    return `--rm \
--cpus=1 \
--memory=${memoryLimit}m \
--network=none \
--pids-limit=64 \
--cap-drop=ALL \
--security-opt=no-new-privileges`;
}