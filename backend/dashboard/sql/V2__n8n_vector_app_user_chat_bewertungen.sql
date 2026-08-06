-- Zielt auf die NEUE, separate Datenbank n8n-vector (Container n8n_postgres-vector),
-- nicht mehr auf n8n-main (V1). Manuell ausfuehren, ddl-auto=none.
--
-- app_user existiert bereits mit den passenden Spalten (username/email/password_hash/
-- role/enabled/created_at), aber ohne die Constraints, die unser Code voraussetzt.
-- Tabelle ist aktuell leer.
ALTER TABLE app_user ALTER COLUMN enabled SET DEFAULT TRUE;
ALTER TABLE app_user ALTER COLUMN role SET NOT NULL;
ALTER TABLE app_user ALTER COLUMN enabled SET NOT NULL;
ALTER TABLE app_user ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE app_user ADD CONSTRAINT app_user_role_check CHECK (role IN ('STUDENT','TEACHER'));
-- username/email haben bereits eigene UNIQUE-Constraints (app_user_username_key/
-- app_user_email_key) - hier nicht erneut anlegen.

-- Chat_messages: sender-Spalte ergaenzen, um Schueler-/Agent-Nachrichten zu unterscheiden
-- (im neuen Schema urspruenglich nicht vorgesehen). Tabelle ist aktuell leer.
ALTER TABLE "Chat_messages" ADD COLUMN sender VARCHAR(10);
ALTER TABLE "Chat_messages" ALTER COLUMN sender SET NOT NULL;
ALTER TABLE "Chat_messages" ADD CONSTRAINT chat_messages_sender_check CHECK (sender IN ('STUDENT','AGENT'));
ALTER TABLE "Chat_messages" ALTER COLUMN "User_idUser" SET NOT NULL;

-- bewertungen verweist bisher auf die alte, login-lose schueler-Tabelle. Da app_user
-- jetzt die Login-Tabelle ist (siehe Chat_messages/Session/Lernstand-FKs, die bereits
-- auf app_user zeigen), wird schueler_id hier ebenfalls auf app_user umgehaengt -
-- sonst wuerde jede Bewertung an der leeren schueler-Tabelle per FK-Verletzung scheitern.
ALTER TABLE bewertungen DROP CONSTRAINT bewertungen_schueler_id_fkey;
ALTER TABLE bewertungen ADD CONSTRAINT bewertungen_schueler_id_fkey
    FOREIGN KEY (schueler_id) REFERENCES app_user("idUser") ON DELETE CASCADE;
ALTER TABLE bewertungen ADD COLUMN teacher_id INTEGER REFERENCES app_user("idUser") ON DELETE SET NULL;
