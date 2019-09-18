from .environment import env


SESSION_COOKIE_DOMAIN = env.str("GAN_SESSION_COOKIE_DOMAIN", default="gan.inprogress.rocks")
