'use client'

import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
  }

export const NavLink = ({
    href,
    onOpenChange,
    className,
    children,
    ...props
  }: MobileLinkProps) => {
    const router = useRouter()

    return (
        <Link
          href={href}
          onClick={() => {
            router.push(href.toString())
            onOpenChange?.(false)
          }}
          className={cn(className)}
          {...props}
        >
          {children}
        </Link>
      )
  }
