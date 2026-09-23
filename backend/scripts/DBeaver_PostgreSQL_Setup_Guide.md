# Complete Guide: Connecting DBeaver to PostgreSQL Database

This step-by-step guide explains how to connect **DBeaver** to your PostgreSQL database, execute the database schema, and test your .NET Clean Architecture backend.

---

## 1. Prerequisites
- **DBeaver Community or Enterprise** installed ([Download DBeaver](https://dbeaver.io/download/))
- **PostgreSQL 14, 15, or 16** running locally or in Docker / Cloud SQL / Supabase / Neon
- The database name: `bromo_wanderlush_db` (or `postgres`)

---

## 2. Setting Up the Database in DBeaver

### Step 1: Open DBeaver and Create a New Connection
1. Launch **DBeaver**.
2. Click the **Plug icon** (New Database Connection) in the top-left toolbar or select **Database > New Database Connection** from the menu.
3. In the "Select your database" dialog, search for or select **PostgreSQL**.
4. Click **Next >**.

### Step 2: Configure Connection Settings (Main Tab)
Fill in the connection details according to your PostgreSQL server:

| Field | Local PostgreSQL | Docker Container | Cloud SQL / Remote |
| :--- | :--- | :--- | :--- |
| **Host** | `localhost` or `127.0.0.1` | `localhost` | Remote IP or Cloud Hostname |
| **Port** | `5432` | `5432` | `5432` |
| **Database** | `postgres` (or `bromo_wanderlush_db`) | `postgres` | Your assigned database name |
| **Authentication** | `Database Native` | `Database Native` | `Database Native` |
| **Username** | `postgres` | `postgres` | Your username (e.g. `postgres`) |
| **Password** | Your PostgreSQL password | Your chosen password | Your assigned password |

> **Driver Tip**: If DBeaver asks you to download the PostgreSQL JDBC driver files on first connect, click **Download**. DBeaver will automatically fetch the latest official PostgreSQL JDBC driver.

### Step 3: Test the Connection
1. Click the **Test Connection ...** button at the bottom-left of the dialog.
2. If successful, you will see a green checkmark dialog:
   ```text
   Connected: PostgreSQL [version]
   Driver: PostgreSQL JDBC Driver
   ```
3. Click **Finish**.

---

## 3. Creating the Database & Running the SQL Script

### Step 1: Create Database (if not already existing)
1. In the DBeaver **Database Navigator** panel on the left, right-click on your PostgreSQL connection.
2. Select **SQL Editor > New SQL Script** (or press `Ctrl+` or `Cmd+`).
3. Type:
   ```sql
   CREATE DATABASE bromo_wanderlush_db;
   ```
4. Press `Ctrl + Enter` (or `Cmd + Enter`) to run the statement.
5. In the left panel, expand your connection. You should see `bromo_wanderlush_db`. Right-click it and choose **Set Active** or open a new SQL editor tab targeting `bromo_wanderlush_db`.

### Step 2: Execute the Wanderlush Schema Script
1. Open the file `/backend/scripts/init_postgres.sql` in DBeaver (or drag & drop it into DBeaver).
2. Or copy the SQL script content into the DBeaver SQL console.
3. Click the **Execute SQL Script** icon (the orange play button with a page icon, or press `Alt + X`).
4. You will see:
   - `users` table created
   - Unique index `idx_users_email` created
   - Timestamp auto-update trigger created
   - Demo user inserted (`aris.traveler@wanderlush.com`)

### Step 3: Inspect the Data in DBeaver
1. In the **Database Navigator**, expand:
   `bromo_wanderlush_db > Schemas > public > Tables > users`
2. Double-click the `users` table.
3. Click on the **Data** tab to view existing records, inspect columns, and verify live updates as users sign up or edit their profile!

---

## 4. Connecting the .NET Clean Architecture API to PostgreSQL

In `/backend/Bromo.WebApi/appsettings.json`, set your PostgreSQL connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=bromo_wanderlush_db;Username=postgres;Password=YOUR_POSTGRES_PASSWORD;Include Error Detail=true;"
  }
}
```

Then run the .NET Web API:
```bash
cd backend/Bromo.WebApi
dotnet run
```

Swagger will open at:
```text
http://localhost:5000/
https://localhost:5001/
```

Test the endpoints:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `DELETE /api/users/account`
