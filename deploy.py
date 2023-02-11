import os

# save the answer to a variable
commit_name = raw_input("Commit Name: ")
os.system("git add .")
os.system("git commit -m \""+ commit_name + "\"")
os.system("git push heroku master")
os.system("heroku open")