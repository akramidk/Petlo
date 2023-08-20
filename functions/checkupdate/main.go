package main

import (
	"encoding/json"
	"net/http"
	"os"
)

var appVersions = map[string]string{
	"ios":     "1.0.0",
	"android": "1.0.0",
}

func handleCheckAppVersion(res http.ResponseWriter, req *http.Request) {
	resp := make(map[string]any)

	phoneOS := req.URL.Query().Get("phone_os")
	appVersion := req.URL.Query().Get("app_version")
	switch {
	case len(phoneOS) == 0 && len(appVersion) == 0:
		resp["value"] = false
	default:
		resp["value"] = appVersion < appVersions[phoneOS]
	}

	_ = json.NewEncoder(res).Encode(resp)
}

func main() {
	http.HandleFunc("/check-update", handleCheckAppVersion)

	port := os.Getenv("PORT")
	if port == "" {
		port = "80"
	}

	http.ListenAndServe(":" + port, nil)
}
