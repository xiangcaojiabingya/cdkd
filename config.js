export default {
	"env": "dev",
	// "env": "uat",
	"local": {
		//基础路径
		"baseUrl": "http://10.10.48.106:21002",
		//访问路径
		"accessUrl": "http://172.30.109.226:8080/#/",
		// 图片路径
		"baseImgUrl": "http://10.10.48.106:20003/",
		// 中台固定参数
		"grant_type": "client_credentials",
		// 中台渠道参数
		"txBrNo": "BOP-2021031611200",
		"chnlCode": "C0000372-T",
		"client_secret": "f858486245c647948d310f981f03b565",
		// 中台公钥和密钥 私钥第二个
		"rsaPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm9iqnkBnlY3YDatIrgVgdWScvqEygcZL/dVTwvSIielA0uhxU+72QBAyUS8LlATFXFFnnqeGxT+tF6mH2bGUI9rTyTPiZzETcmJ6ILmy28B154j80QOVN+ZLiFPqfFcKnv1eeX1m4qdwAVWOLjJtUR8/bjMRYLZSJ+6/Tffu2znZSXj1XJ5oviGKl3YuUgJZQQoi52ZmvL3V58DCezsOsDDZ7ZFORNEjb8RWlYs+SAyxGYMUehrCrimpZHtWg/8J7PwADBhSIntPj6sP1crFnE1szJcq0dzp8H8ZIcWGSnckggoz89znxXAANedjSHvVjX+LoWRvOsCe2IneWakIzQIDAQAB",
		"rsePrivateKey": "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQzWEfgUXKaDdGB68N5WpTP9afDvbWo/6y4yfZDWMZwVfMrD0btHrz/h7IPgJpLnJKNQBN8adpu5RQs0a/TJ3YCWq5nWfAyMJi73Mpn0nlCQtP+i1c2/+vAOvM425Kmzc86IPC0PKb0LNM6zlV+Pe/tJ5kmMRgDfFtw0TgBxLfW1FakPnf5oXzvBDG77w4vwQnMhc/7Ap8rELVC7luK/HvLGb44Jl4Pk/ow9ZvHi5DGFR9wUYV/bVXV1Z7t0c6TxsA1osXas7vAv/62nlvhyBJdXRIPF1oittpPLpR+8RkU271dTY1R90OVcQ7gIChMU7y3AMUbcC64dM8ILGh1SEXAgMBAAECggEBAJ84reIvWr/RHq0ZOOT4105qNMgPyiy824Ef9QfvzG0cYU5i3SpeQxAB7Qk3N/FrCJ4LspK9PrNC5gNv4fgIfaj67VZjcHWy4YA+JexMWjX74pN3K9ZOsLeLlUQk/bqIh+O7TpZlbUtiJwf1q0Ai3RFjsxD06XJxz3Oq3r+SxVJp13n9sFGh/wHWLgKBmqXBskpNd5UkfIKjIfxTwKRB/HLXG86t/Yr6SmdqXeOdXTwF8q0yE454XI+nCgjfhNQBB/4gKy9pjzPJxmIuMYysHEhDWQrNEFGoalU1rxSAAIJ6Px8R+G97UpJQHTq2kSIYbJ4u41cCxD3s8ypSdxpZ/hECgYEA+h5AVYzRIFKky/QE8W1xRPLo7oY5klTXHeoEwFJrlPM9rBJJo7zmGmST1I7s6wjNAfopOS0Fm9VHaAwSYh8eL/PyF85t9w9PZVjrXO4Bk9k4kNVkJx/XlmtDDabDe8BBqSKdbqDPq84pgqL29bdDfpR6LQYutg1NDNbyIFOPjl8CgYEA1bZmcSIVrOpqDirzSiov6GEf8tvIRdNnhKlY231dHXcaBxw0FUQ3Ewm0AQFIatf3Og2WNnOCXM7lx4ksEMSr95wuChm/q+5D3/4E9JDmvopQRpry1ViXgVkYZztH/p4P2UW4kgQh4IAf4emTxe67Jz00tCZiGraXO7yCEst3eEkCgYBmH8n25FtTDkt5dzY5eY1BMMmI8sc5B2kaLr4n5L9GfxbUVlc5At0VM7HknUMBKIPEZedFECv1F91jD2LGK5yAyeM0czYVJWwunmLje86rFotxH6AYFXlKUpt7THcO5U4qCBct331L0g7C51VcuKpXWbqU/aw+6yllr7IHHvdDkwKBgEyX0p85WAtg+CGbwxYRiJoANTMVEfH0kmU5TF9dzsGArhNeSExW5mYsVBcIHqwsOq7Tr8JUI6SfgjrBLsnTss5LazSzhb5Y5nqgz6XXSNuBNsQXRHCyD5qME/LrjCH1BDkag8vRL1MGmGafEBcgOHMXvIvUNdTdG9aM+RFDWs4BAoGBAIU/B7rfBEOmRS8h2evDDPdPYbBZCcJPM1AUj6hsMg/dZ8ryym/ly0fTu+VA09bJd3VqVkbCQ/l5lMaHS0v3OOiCC9a9ehj1nw/AMx4HS3GdCg7zarPNdIixvBMkKWl7Ol1/2hLL5glkomGqNSwrcrRbAjkUY1vNzZ12LrQESVj9"
	},
	"prod": {
		"baseUrl": "http://39.1.195.27:20002",
		"baseImgUrl": "http://39.1.195.27:18028/",
		"grant_type": "client_credentials",
		"txBrNo": "BOP-2021031611200",
		"chnlCode": "C0000360",
		"client_secret": "aa7cf4115eb7410a81d5675c55011b50",
		"rsaPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgyJPtoVp6dMZ/t0+iwx22kNmQS7pD1W7SoPoN06b1kfDtvu82UjiYiy/4iIsrFJplznJk5gYBJ/mf1go/n6DVApz43MgQ26kSfSRtfTAbXz2MrVPKbIx1kOfNTkjZrcZwcqee4Ih3/g4JxDxPjNvot6xp2OtawbDOmtINXrOYIRGyqWXM3X0CPE/nIuigOi4ld906eY2twlLPpqJ+IJe53O7MbjrqSkg/fXQr+zRrm10hSv14DR19yUsJsE2pZ4XPU9Ll5Qgb0fEX+q6nCgYbn6a0y0IB6KXW09YjS21k0ROU1HiofPbzapmKTHpTQ+VoQ5Ff+sD9sHzLhI+Z59HwwIDAQAB",
		"rsePrivateKey": "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC5xikbj5//uvbabZqErpM9ZOT5J6pWDe+mDd5+ay/x5VgiwJ3w5DNClaGAySJKc+SH3A5ee+WwSID+Ox7H/oIuxTwLQaEpIQCz80Xemz/KkkGpj6+j1OBGzuQb/VLi3inSOjILg5xhyG+hmMM517sP0p4qyNLesyd/qa3PX50Fk2l7puZnkOaaAGmkli21LA04ypXuZ/fJv7Ts2j/AFb1co8PEYRW5Tn6xmZ0NZx7d2yG8Wou3z7cHIeLQsMJhjXOt8LT297XYqmDCFUtebdpl62oRF6mQOdkzCoU1esjKH3nJh7XK2NHjNvXvxjEiAGurQgWlqXRqlGLQ3FohOEoDAgMBAAECggEATh37jzFX0EsoHjVUclKOa5SPjA2X3NPDYAoY8wPTh14vL33bbD4pJ+iPnv30w2X0RQTNrgFfVj9GrqDhkqt8xnn9g6Y3RHoyN3kmejLCIkZaAhj/fF65aEz7MqHVRrywzUvXW2weSCfmeQcpoJsMd9zS0Z7cvPSMuWv6QGcuOfdHtxneA2wX2m/mPrK0anrmslFck2EkfsjPPCS7CLxtdA9LNwAE/3uHbHcnTZsNwcb2YWNQt1KXupcRZP+zZNOwepSq2FmYb2WrHjbT97f9f8aHutDq8uClw1zBBQkIXmbmh8Xew+S9vHBhgZjX08eXpv7I2sklaSWUvBs7oQ5q8QKBgQD4v/40KVg7VqyRb45tEZkamf3jH4/CPaSt3lIGd/Z/t1XsKW4Opdug5QMbqxc6SrxoT3dZCrOfwtqFKsphO4FGW0/phO+hjWiknhbSCZM9+VjXrEUUZ68zto9YpS7t7VSvmcNzF5Fvp1kCqXiilq69djpUceOxU6N556ZSXMenDQKBgQC/MEiAoAnuVAhHBnsnpgOjEoJRhX9PUSkvQLue83GnzTRu0SbAZ/WsNj3GNlBOujQbdqTwUx6W2zUHStDEuiY2cUqX71yDdiLaEoyCOcjk2ONImqiT5ZrvK6Od9AcjAo0sVUrhA553iHLTBY1Jwky5pXdQ8s0/YWC85nYvoptxTwKBgQDHX5sv07OUW/QU3YUahnBgkeycjj97QE0tznOQG7bGxvtnPg2oT+epHeVP1+HWJvC76nWOOLWf512ePp3XMQp8idOTJ6mpot2sk8lWr7YEhkZfFwSHRlN272wVcNAcg4zM8kFljg5Tn54INC0so/mKgahe5qnJB3CP1MvKV/LuQQKBgQCWvCSNdKAfzRTxmoSCj/sSGMeyKkRjbqO/45OJEHqtR7ZtIG0jCVPCQMmXer76MwheFr6X05Csc4ttgmjykakLB2s+OrN/2iZENJefHJvtAarAVV9Pq5jptEg9gmYWDi7roxt0KHxJ1cRh52CrpIsFWxWlNqjnrYitpi3MBLH1NQKBgQCD7u4wO1cGJV8YH/41wwx7OpJKZLtn7y3vDLeOvgsX6zqxQXls3jiuNLsVhxy7pjoUJCuEO79X14ZJZUsD+Be57nchjh9ho+OHHswQIcRHhHeTxL7c+AwAfUXcYc+oC+iqP6orqKvm5jjV23NzMzuuJbPLsKW0Vi2SZrgJoFvtew=="
	},
	"dev": {
		"baseUrl": "https://ttt.ebanktest.com.cn:39009/app",
		"accessUrl": "https://ttt.ebanktest.com.cn:39009/statics/openbank/cdkd_h5/#/",
		"documentUrl": "https://ttt.ebanktest.com.cn:39009/statics/",
		"baseImgUrl": "",
		"grant_type": "client_credentials",
		"txBrNo": "BOP-2021030511000",
		"chnlCode": "C0000359-T",
		"client_secret": "5731ac5657b043719b319dac2c52aacf",
		"rsaPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm9iqnkBnlY3YDatIrgVgdWScvqEygcZL/dVTwvSIielA0uhxU+72QBAyUS8LlATFXFFnnqeGxT+tF6mH2bGUI9rTyTPiZzETcmJ6ILmy28B154j80QOVN+ZLiFPqfFcKnv1eeX1m4qdwAVWOLjJtUR8/bjMRYLZSJ+6/Tffu2znZSXj1XJ5oviGKl3YuUgJZQQoi52ZmvL3V58DCezsOsDDZ7ZFORNEjb8RWlYs+SAyxGYMUehrCrimpZHtWg/8J7PwADBhSIntPj6sP1crFnE1szJcq0dzp8H8ZIcWGSnckggoz89znxXAANedjSHvVjX+LoWRvOsCe2IneWakIzQIDAQAB",
		"rsePrivateKey": "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCJImGU4x+8zXHYF576v3u5edtPwxKubzA4VobS8QyJhLHluPyLWfd1dgKyQ3kU/nBt57JTfJ83R4otovutt2wMyiN+LO5xE7Zj8O4gK8XzjrDsUxZ+f6jO2yXmj4ZWXEf/PO8aRYgPXmObsGSIXWYVhq3sO+OhYy2BcjAAF2YmyvGF7jEFK0XeKWAQjogZrHP2XPUQzId5WI8lSbtyISf433Uvkj25hPx75TAXG6nuqBiILhwHHUc3LDnWtepZ1/pYEM0obwoeAgJLJhttot2FcjGGkRGQmXTWXUWGY34CTs31uNyOgK3tiMKfkq7dZatCCIGrHg+6diefdLya4ys5AgMBAAECggEACuw2IYnFqWAjxTZ8bzR5Qli2YzACeOpaSOJ7cqnIedub39RQKTlNQInZxSEir81kXxypU4UFmX2VP/VPXpLRhGNFWHNzuoX7bRJvpRhXeALRjMFBdWntpCxIZIjiBlbrVSUhVlJbd/3oqSnvl/z4eJZ1m+9ZPi2MHldeA2PZuxUn3f7ECSTiCUc5LnON6EpMBXbIbvqtfeBFirN71Mig8pZQBbLPqdE5qkTywmrszUpymyOh2DLlFZw23dWBD9sQAn/A66cpU7JF23SjBh0s2BB5fb1EhcpbZ2X0ssNL2L0gs3GfsrCssX821ahnp371qdjZHwfjxXGO++lozJ6kQQKBgQD8uByY6c2UD+jjMFFD4YQcaMFQX/IxGptePWoE6RiU0DYhSJpGwm0bK3PccoaVb1hrPU0UUIrI6CCo8TuL7AwGZyUrsbARdEMfmhp+ehrpHnxX4IBx3YzmkMfghh45MCFon2GWdEUncfOvJ8ZjhjZtj180OPbd7+gxmSmi6pIbNQKBgQCK6iJQ5vGlV0/dTwnaS8OxNsORk3ifUVAmXO+strfdWVj3gZtObPJv9B2DJZQjMwnYkWPTimXmcxOV5XW3B8htr2lnOxtRlV0eC7/FOiRaJyQR1yr+4ypQlrsN3fD8Cm4PlWSnx25c/BPI4ZH3xxGQDJRc8vx9Dfin4JwVRgVMdQKBgQCJa8A5MmHUknYsHBkElXvWSuxbvWCgbPxxWWnuM6ZnPXVB0g36Tj0wGgfNpwUh+0MURWhFlKpzJy6jT1H2+ytqy+m9gcjhJNxfMdgYUGOTwj0ROAYAZN36fl4B7ExBArgYARr6ykzUbzV4WGObuN6d4ul9J0CuXIdheQzYBz/dxQKBgFJrgFjH7W/QUg5YqtveQAmRGI/zE4pTUF6ynXG4J3cpX+PZ/i+V7HIIQMpjLXWE/r6D5NrKLpOAi4pQTnt+HqkVflBFfXv2Rv1gszNtv8vNlVUQeO4qEh0mkW001Zp1BcAxPztc1FpPJd32GAkPD5iMHirX8H6yH2pblb/5f4NRAoGALEgCMfuQ9Y/xMvBQU0RgfL/faieWOIBRpGdH4KQgM6lGaidg92Liw7q4lf+z6Rduk4wKmc/z674xCjg2uU3X5JoqgqF04WZ+1X4jA2lCFUZ1cWpvMh9bZV+5bfcDFrz/5pMOwunJI/K9D+En+JgCM1uIKUMXNZIjNYDifgx4sBQ="
	},
	"uat": {
		"baseUrl": "https://ttt.ebanktest.com.cn:39009/prod/app",
		"accessUrl": "https://ttt.ebanktest.com.cn:39009/prod/statics/openbank/cdkd/#/",
		"documentUrl": "https://ttt.ebanktest.com.cn:39009/prod/statics/",
		"baseImgUrl": "",
		"grant_type": "client_credentials",
		"txBrNo": "BOP-2021030511000",
		"chnlCode": "C0000359-T",
		"client_secret": "5731ac5657b043719b319dac2c52aacf",
		"rsaPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm9iqnkBnlY3YDatIrgVgdWScvqEygcZL/dVTwvSIielA0uhxU+72QBAyUS8LlATFXFFnnqeGxT+tF6mH2bGUI9rTyTPiZzETcmJ6ILmy28B154j80QOVN+ZLiFPqfFcKnv1eeX1m4qdwAVWOLjJtUR8/bjMRYLZSJ+6/Tffu2znZSXj1XJ5oviGKl3YuUgJZQQoi52ZmvL3V58DCezsOsDDZ7ZFORNEjb8RWlYs+SAyxGYMUehrCrimpZHtWg/8J7PwADBhSIntPj6sP1crFnE1szJcq0dzp8H8ZIcWGSnckggoz89znxXAANedjSHvVjX+LoWRvOsCe2IneWakIzQIDAQAB",
		"rsePrivateKey": "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCJImGU4x+8zXHYF576v3u5edtPwxKubzA4VobS8QyJhLHluPyLWfd1dgKyQ3kU/nBt57JTfJ83R4otovutt2wMyiN+LO5xE7Zj8O4gK8XzjrDsUxZ+f6jO2yXmj4ZWXEf/PO8aRYgPXmObsGSIXWYVhq3sO+OhYy2BcjAAF2YmyvGF7jEFK0XeKWAQjogZrHP2XPUQzId5WI8lSbtyISf433Uvkj25hPx75TAXG6nuqBiILhwHHUc3LDnWtepZ1/pYEM0obwoeAgJLJhttot2FcjGGkRGQmXTWXUWGY34CTs31uNyOgK3tiMKfkq7dZatCCIGrHg+6diefdLya4ys5AgMBAAECggEACuw2IYnFqWAjxTZ8bzR5Qli2YzACeOpaSOJ7cqnIedub39RQKTlNQInZxSEir81kXxypU4UFmX2VP/VPXpLRhGNFWHNzuoX7bRJvpRhXeALRjMFBdWntpCxIZIjiBlbrVSUhVlJbd/3oqSnvl/z4eJZ1m+9ZPi2MHldeA2PZuxUn3f7ECSTiCUc5LnON6EpMBXbIbvqtfeBFirN71Mig8pZQBbLPqdE5qkTywmrszUpymyOh2DLlFZw23dWBD9sQAn/A66cpU7JF23SjBh0s2BB5fb1EhcpbZ2X0ssNL2L0gs3GfsrCssX821ahnp371qdjZHwfjxXGO++lozJ6kQQKBgQD8uByY6c2UD+jjMFFD4YQcaMFQX/IxGptePWoE6RiU0DYhSJpGwm0bK3PccoaVb1hrPU0UUIrI6CCo8TuL7AwGZyUrsbARdEMfmhp+ehrpHnxX4IBx3YzmkMfghh45MCFon2GWdEUncfOvJ8ZjhjZtj180OPbd7+gxmSmi6pIbNQKBgQCK6iJQ5vGlV0/dTwnaS8OxNsORk3ifUVAmXO+strfdWVj3gZtObPJv9B2DJZQjMwnYkWPTimXmcxOV5XW3B8htr2lnOxtRlV0eC7/FOiRaJyQR1yr+4ypQlrsN3fD8Cm4PlWSnx25c/BPI4ZH3xxGQDJRc8vx9Dfin4JwVRgVMdQKBgQCJa8A5MmHUknYsHBkElXvWSuxbvWCgbPxxWWnuM6ZnPXVB0g36Tj0wGgfNpwUh+0MURWhFlKpzJy6jT1H2+ytqy+m9gcjhJNxfMdgYUGOTwj0ROAYAZN36fl4B7ExBArgYARr6ykzUbzV4WGObuN6d4ul9J0CuXIdheQzYBz/dxQKBgFJrgFjH7W/QUg5YqtveQAmRGI/zE4pTUF6ynXG4J3cpX+PZ/i+V7HIIQMpjLXWE/r6D5NrKLpOAi4pQTnt+HqkVflBFfXv2Rv1gszNtv8vNlVUQeO4qEh0mkW001Zp1BcAxPztc1FpPJd32GAkPD5iMHirX8H6yH2pblb/5f4NRAoGALEgCMfuQ9Y/xMvBQU0RgfL/faieWOIBRpGdH4KQgM6lGaidg92Liw7q4lf+z6Rduk4wKmc/z674xCjg2uU3X5JoqgqF04WZ+1X4jA2lCFUZ1cWpvMh9bZV+5bfcDFrz/5pMOwunJI/K9D+En+JgCM1uIKUMXNZIjNYDifgx4sBQ="
	}
}