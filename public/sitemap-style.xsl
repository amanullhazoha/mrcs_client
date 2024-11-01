<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
   <xsl:template match="/">
       <html>
       <head>
         <title>Sitemap for MRCS Aid</title>
         <style>
           body { font-family: Arial, sans-serif; }
           h2 { color: #4CAF50; }
           table { width: 100%; border-collapse: collapse; }
           th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
           th { background-color: #f2f2f2; }
         </style>
       </head>
       <body>
         <h2>Sitemap for MRCS Aid</h2>
         <table>
           <tr><th>URL</th><th>Change Frequency</th><th>Priority</th></tr>
           <xsl:for-each select="urlset/url">
             <tr>
               <td><xsl:value-of select="loc"/></td>
               <td><xsl:value-of select="changefreq"/></td>
               <td><xsl:value-of select="priority"/></td>
             </tr>
           </xsl:for-each>
         </table>
       </body>
       </html>
   </xsl:template>
</xsl:stylesheet>
