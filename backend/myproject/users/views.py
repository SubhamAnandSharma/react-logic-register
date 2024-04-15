from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
# from .models import OTP
from .serializers import RegistrationSerializer, LoginSerializer
from django.contrib.auth import authenticate, get_user_model
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


@api_view(['POST'])
@permission_classes([AllowAny])
def registration_view(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        send_otp_email(user.email, user.otp)  # Send OTP email
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def send_otp_email(recipient_email, otp):
    print(recipient_email,"--recipient_email--")
    sender_email = 'mrsubham595@gmail.com'
    sender_password = 'eikwhznpcrlllajt'
    subject = 'OTP Verification'
    message = f'Your OTP is: {otp}'

    # Set up the SMTP server
    smtp_server = "smtp.gmail.com"
    smtp_port = 587  # Port for TLS

    # Create a secure SSL context
    smtp_context = smtplib.SMTP(smtp_server, smtp_port)
    smtp_context.starttls()  # Enable TLS

    try:
        # Login to your Gmail account
        smtp_context.login(sender_email, sender_password)

        # Create a multipart message and set headers
        email_message = MIMEMultipart()
        email_message['From'] = sender_email
        email_message['To'] = recipient_email
        email_message['Subject'] = subject

        # Attach the message to the email
        email_message.attach(MIMEText(message, 'plain'))

        # Send the email
        smtp_context.sendmail(sender_email, recipient_email, email_message.as_string())

        print("Email sent successfully!")

    except smtplib.SMTPAuthenticationError:
        print("Failed to authenticate. Check your email and password.")
    except Exception as e:
        print("An error occurred:", str(e))

    finally:
        # Quit the SMTP server
        smtp_context.quit()


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = authenticate(request, email=email, password=password)
        if user:
            # Generate token for user
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

