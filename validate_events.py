import json
import jsonschema
from jsonschema import validate

with open("schema.json") as f:
    schema = json.load(f)

with open("events.json") as f:
    data = json.load(f)

try:
    validate(instance=data, schema=schema)
    print("✅ Events file is valid!")
except jsonschema.exceptions.ValidationError as e:
    print("❌ Validation error:", e)
