import { db } from "../lib/db"; import bcrypt from "bcryptjs";
const [email,password,name="Administrator"] = process.argv.slice(2);
if(!email||!password||password.length<12){ console.error("Gunakan: pnpm admin:create email@contoh.id password-minimum-12 [nama]"); process.exit(1); }
db.user.upsert({where:{email},update:{name,passwordHash:bcrypt.hashSync(password,12)},create:{email,name,passwordHash:bcrypt.hashSync(password,12)}}).then(()=>console.log("Admin dibuat/diperbarui.")).finally(()=>db.$disconnect());
