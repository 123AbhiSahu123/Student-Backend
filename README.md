#) Live URL on Render:-https://student-dashboard-u1rj.onrender.com

Super Admin:-
POST :- /api/superadmin/login;
POST :- /api/superadmin/dashboard;
GET :- /api/superadmin/students;
DELETE:- /api/superadmin/students/:id;
POST:-  /api/superadmin/teacher/register;
GET:- /api/superadmin/teacher/;
POST:- /api/superadmin/logout;

GET :- /health
POST :- /api/register
POST :- /api/login
POST :- /api/data
GET :- /api/profile
POST:- /api/logout



#) git init ko revert karne ke liye:-
Remove-Item -Recurse -Force .git

#) Important Hostimg
"Vercel" :> Frontend Hosting
"Render" :> Backend Hosting 
"Supabase" :> Postgres Database Hosting in Cloud. 

#) Version show:	
CLI Program :- name -v   (e.g. git, node, npm)
Library :- npm list zod  (e.g. zod, react, express)

#) joi and zod both work same:-
React + Express dono pe validation → Zod
Sirf Express backend → Joi

#) This is aplicable in Backend not Frontend as your choice :
*) import + "type": "module" = .js { "in import /name.js extension is neccessary" }
*) import + "type": "commonjs" require = /name.js optional.

*) parse = galat ho toh error phenk deta hai. 
*) safeParse = result dikha deta hai, crash nahi.