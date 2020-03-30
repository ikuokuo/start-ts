.DEFAULT_GOAL := tsc

SHELL := /bin/bash

TS ?=

ifeq ($(OS),Windows_NT)
	OPEN := start
else
	UNAME_S = $(shell uname -s)
	ifneq ($(findstring Linux,$(UNAME_S)),)
		OPEN := xdg-open
	else ifneq ($(findstring Darwin,$(UNAME_S)),)
		OPEN := open
	else
		$(error "Can't detect host os")
	endif
endif

define echo
	text="$1"; options="$2"; \
	[ -z "$$options" ] && options="1;33"; \
	echo -e "\033[$${options}m$${text}\033[0m"
endef

define tsc
	ts="$1"; \
	if [ -z "$$ts" ]; then \
		$(call echo,make TS=?,35); \
	elif [ ! -f "$$ts" ]; then \
		$(call echo,$$ts not found,35); \
	elif [ "$${ts##*.}" != "ts" ]; then \
		$(call echo,$$ts not *.ts,35); \
	else \
		$(call echo,tsc $$ts,32); \
		tsc $$ts; \
		html="$${ts%.ts}.html"; \
		if [ -f "$$html" ]; then \
			$(call echo,$(OPEN) $$html,32); \
			$(OPEN) $$html; \
		fi \
	fi
endef

.PHONY: tsc
tsc:
	@$(call tsc,$(TS))

.PHONY: clean
clean:
	@find . -type f -name "*.js" -print0 | xargs -0 -I {} bash -c 'echo "rm {}" && rm {}'
