import { z } from "zod";

export const updateMessageSchema = z.object({
    body: z.object({
      message: z.string({
        required_error: "Message is required"
      })
    }),
    params: z.object({
      messageId: z.string({
        required_error: "MessageId is required"
      })
    })
});

export const getMessageSchema = z.object({
    params: z.object({
      messageId: z.string({
        required_error: "MessageId is required"
      })
    })
});

export const deleteMessageSchema = z.object({
    params: z.object({
      messageId: z.string({
        required_error: "MessageId is required"
      })
    })
});

export const createMessageSchema = z.object({
    body: z.object({
      message: z.string({
        required_error: "Message is required"
      })
    })
});

export const createUserSessionSchema = z.object({
    body: z.object({
      username: z.string({
        required_error: "Username is required"
      }),
      password: z.string({
        required_error: "Password is required"
      }),
    })
});

export const createUserSchema = z.object({
    body: z.object({
      username: z.string({
        required_error: "Username is required"
      }),
      password: z.string({
        required_error: "Password is required"
      }),
    })
});