package main

import (
	"bytes"
	"encoding/json"
)

var appVersions = map[string]string{
	"ios":     "1.1.0",
	"android": "1.1.0",
}

func Main(args map[string]interface{}) map[string]interface{} {
	resp := make(map[string]interface{})

	phoneOS, ok := args["phone_os"].(string)
	if !ok {
		resp["value"] = false
	}
	appVersion, ok := args["app_version"].(string)
	if !ok {
		resp["value"] = false
	}

	resp["value"] = appVersion < appVersions[phoneOS]

	_, _ = phoneOS, appVersion

	out := bytes.NewBuffer([]byte{})
	enc := json.NewEncoder(out)
	_ = enc.Encode(resp)
	return map[string]interface{}{
		"body": out.String(),
	}
}
