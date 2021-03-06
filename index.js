const BoostPlugin = require("../boost/api/plugins/BoostPlugin");
const crypto = require("crypto");
const {SecretManagerServiceClient} = require("@google-cloud/secret-manager");
const client = new SecretManagerServiceClient();

class GCSanctumAuthenticator extends BoostPlugin{

    async onSanctumEncryptSecret(data, project_key) {
        const config = require("../../../server.config");
        const gc_project_id = (config.sanctum.gc_project_id !== undefined) ? config.sanctum.gc_project_id : null;
        if(gc_project_id !== null){
            let name = "projects/" + gc_project_id + "/secrets/sanctum-public/versions/latest";

            const [version] = await client.accessSecretVersion({
                name: name
            });

            const key = version.payload.data.toString();

            try{
                return crypto.publicEncrypt({
                    key: key,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256"
                }, Buffer.from(JSON.stringify(data))).toString("base64");
            }catch (e){
                return null;
            }
        }

        return null;
    }

}

module.exports = GCSanctumAuthenticator;