import argparse
import json
import sys
import urllib.parse
import uuid
from sarovi_http import Sarovi, answer

p = argparse.ArgumentParser(description="Sarovi Python first request; standard library only.")
p.add_argument("command", choices=["hello", "models", "receipt"], nargs="?", default="models")
p.add_argument("--prompt", default="Say hello in Persian and English in one sentence.")
p.add_argument("--idempotency-key")
p.add_argument("--demo", action="store_true", help="Offline fixture; no network or credits.")
args = p.parse_args()
try:
    if args.demo:
        print(json.dumps({"demo": True, "text": "سلام! Hello from the offline demo.", "usage": {"total_tokens": 0}}, ensure_ascii=False))
    else:
        api = Sarovi()
        if args.command == "models":
            print(json.dumps(api.request("/models")[0], ensure_ascii=False, indent=2))
        elif args.command == "receipt":
            if not args.idempotency_key: p.error("--idempotency-key is required")
            print(json.dumps(api.request("/requests/lookup?idempotency_key=" + urllib.parse.quote(args.idempotency_key, safe=""))[0], indent=2))
        else:
            key = args.idempotency_key or str(uuid.uuid4())
            print("Idempotency-Key: " + key, file=sys.stderr)
            data, request_id = api.chat([{"role": "user", "content": args.prompt}], key)
            print(answer(data))
            print(json.dumps({"request_id": request_id, "usage": data.get("usage")}), file=sys.stderr)
except (ValueError, RuntimeError, OSError) as error:
    print(str(error), file=sys.stderr)
    sys.exit(1)
