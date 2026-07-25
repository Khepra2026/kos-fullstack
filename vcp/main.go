package main
import (
    "encoding/hex"
    "encoding/json"
    "net/http"
    "crypto/sha256"
    "log"
)
func logHandler(w http.ResponseWriter, r *http.Request) {
    var req struct{ Leaf string \json:"leaf"\ }
    json.NewDecoder(r.Body).Decode(&req)
    h := sha256.Sum256([]byte(req.Leaf))
    proof := hex.EncodeToString(h[:])
    json.NewEncoder(w).Encode(map[string]string{"proof": proof, "root": proof})
}
func main() {
    http.HandleFunc("/log", logHandler)
    log.Fatal(http.ListenAndServe(":8090", nil))
}
