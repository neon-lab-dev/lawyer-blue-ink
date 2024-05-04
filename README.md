## Lawyer Blue Ink

- Email automation for lawyers

### Instruction for using

- Create a excel file
- Create a template in docx format

### Adding placeholders in docx and replacing them with values from excel

- You need to add placeholders in docx file like `{CLIENT_NAME}` and it will be replaced with the value from excel file whose column name is `CLIENT_NAME`
- Remember you can name your placeholders anything you want but it should be same as column name in excel file wrapped in `{}` with no extra spaces or anything.
- You can add multiple placeholders in docx file and they will be replaced with values from excel file.
- If you have a placeholder in docx file but you don't have a column in excel file with that name then it will be replaced with `undefined` in the final docx file. So make sure you have all the placeholders in docx file present in excel file.
- While you can name your placeholders anything you want but it is recommended to name in `UPPERCASE` and `SNAKE_CASE` for distinguishing them from normal text.
- Do not use special characters like `@`, `#`, `$`,`'`, etc. in placeholders. You can use only `A-Z`, `0-9` `space` `_` in placeholders.
- While you can specify the placeholders as you wish, but there are some placeholder that are constant and you need to add them in excel file exactly as they are. These are:
  - `CC EMAILS` : This is a special placeholder that is used to add CC emails in the email. You can add multiple emails separated by comma `,` in the excel file.
  - `CLIENT WHATSAPP NO` : This is a special placeholder that whatsapp number of the client.
  - `CLIENT EMAIL ID` : This is a special placeholder that is used to add client email in the email.

### Adding attachments in email

You can add attachments in the email while entering details manually or from table page or while sending email. You can add multiple attachments. It is recommended to add attachments while sending email as it is more user friendly.
