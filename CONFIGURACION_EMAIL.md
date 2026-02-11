# Configuración de Envío de Email

Para recibir emails con la opción elegida (Desayunar o Cenar), sigue estos pasos:

## 1. Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Verifica tu email

## 2. Configurar el servicio de email

1. Una vez dentro, ve a **"Email Services"** en el menú lateral
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. Copia el **Service ID** que aparece (lo necesitarás después)

## 3. Crear una plantilla de email

1. Ve a **"Email Templates"** en el menú lateral
2. Haz clic en **"Create New Template"**
3. Configura la plantilla con este contenido:

**Subject (Asunto):**

```
🎉 ¡Alguien eligió una opción para San Valentín!
```

**Content (Contenido):**

```
¡Hola!

Alguien ha aceptado tu invitación de San Valentín y eligió:

Opción elegida: {{choice}}
Detalles: {{details}}
Fecha y hora: {{date}}

¡Prepárate para la cita! ❤️
```

4. En la sección **To Email**, pon: `{{to_email}}`
5. Guarda la plantilla y copia el **Template ID**

## 4. Obtener tu Public Key

1. Ve a **"Account"** en el menú lateral
2. Copia tu **Public Key** (aparece en la sección "General")

## 5. Configurar el código

Abre el archivo `script.js` y reemplaza estos valores:

1. **Línea 4**: Reemplaza `'TU_PUBLIC_KEY'` con tu Public Key

   ```javascript
   emailjs.init("tu_public_key_aqui");
   ```

2. **Línea 110**: Reemplaza `'tucorreo@ejemplo.com'` con tu email personal

   ```javascript
   to_email: 'tu_correo@gmail.com',
   ```

3. **Línea 117**: Reemplaza `'TU_SERVICE_ID'` y `'TU_TEMPLATE_ID'`
   ```javascript
   emailjs.send("tu_service_id", "tu_template_id", templateParams);
   ```

## 6. ¡Listo!

Ahora cuando alguien elija "Desayunar" o "Cenar", recibirás automáticamente un email con su elección.

## Nota importante

- EmailJS tiene un plan gratuito con límite de 200 emails/mes
- No necesitas servidor backend, todo funciona desde el navegador
- Es completamente seguro, las credenciales no se exponen en el código

## Troubleshooting

Si no recibes emails:

1. Verifica que hayas verificado tu cuenta de EmailJS
2. Revisa la carpeta de spam
3. Confirma que los IDs sean correctos
4. Abre la consola del navegador (F12) para ver si hay errores
