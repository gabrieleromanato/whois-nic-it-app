package utils

import (
	"net"
	"regexp"
)

type WhoisResponse struct {
	Result string `json:"result"`
}

func ValidateDomainExtension(domain string) bool {
	m := regexp.MustCompile(`(?i)\.it$`)
	return m.MatchString(domain)
}

func WhoisRequest(domain, server string) WhoisResponse {
	conn, err := net.Dial("tcp", server+":43")
	if err != nil {
		return WhoisResponse{Result: "Error"}
	}
	defer conn.Close()
	conn.Write([]byte(domain + "\r\n"))
	buf := make([]byte, 1024)
	n, _ := conn.Read(buf)
	return WhoisResponse{Result: string(buf[:n])}
}
