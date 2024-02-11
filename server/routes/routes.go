package routes

import (
	"gabrieleromanato/whois-nic-it/utils"

	"github.com/gin-gonic/gin"
)

const (
	whoisServer = "whois.nic.it"
)

func HandleWhoisRequest(c *gin.Context) {
	domain := c.Param("domain")
	if !utils.ValidateDomainExtension(domain) {
		c.JSON(400, gin.H{"error": "Invalid domain extension"})
		return
	}
	whoisResponse := utils.WhoisRequest(domain, whoisServer)
	c.JSON(200, whoisResponse)
}
