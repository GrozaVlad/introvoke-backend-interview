import forge from 'node-forge';

function hashPassword(password: string){
    var md = forge.md.sha256.create();
    md.update(password);
    const hashedPassword = md.digest().toHex();
    return hashedPassword;
}

export default hashPassword;