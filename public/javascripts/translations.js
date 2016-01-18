I18n.translations || (I18n.translations = {});
I18n.translations["en"] = I18n.extend((I18n.translations["en"] || {}), {"activerecord":{"errors":{"messages":{"record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"many":"Cannot delete record because dependent %{record} exist","one":"Cannot delete record because a dependent %{record} exists"}}}},"admin":{"actions":{"bulk_delete":{"breadcrumb":"Multiple delete","bulk_link":"Delete selected %{model_label_plural}","menu":"Multiple delete","title":"Delete %{model_label_plural}"},"dashboard":{"breadcrumb":"Dashboard","menu":"Dashboard","title":"Site Administration"},"delete":{"breadcrumb":"Delete","done":"deleted","link":"Delete '%{object_label}'","menu":"Delete","title":"Delete %{model_label} '%{object_label}'"},"edit":{"breadcrumb":"Edit","done":"updated","link":"Edit this %{model_label}","menu":"Edit","title":"Edit %{model_label} '%{object_label}'"},"export":{"breadcrumb":"Export","bulk_link":"Export selected %{model_label_plural}","done":"exported","link":"Export found %{model_label_plural}","menu":"Export","title":"Export %{model_label_plural}"},"history_index":{"breadcrumb":"History","menu":"History","title":"History for %{model_label_plural}"},"history_show":{"breadcrumb":"History","menu":"History","title":"History for %{model_label} '%{object_label}'"},"index":{"breadcrumb":"%{model_label_plural}","menu":"List","title":"List of %{model_label_plural}"},"new":{"breadcrumb":"New","done":"created","link":"Add a new %{model_label}","menu":"Add new","title":"New %{model_label}"},"show":{"breadcrumb":"%{object_label}","menu":"Show","title":"Details for %{model_label} '%{object_label}'"},"show_in_app":{"menu":"Show in app"}},"export":{"click_to_reverse_selection":"Click to reverse selection","confirmation":"Export to %{name}","csv":{"col_sep":"Column separator","col_sep_help":"Leave blank for default ('%{value}')","default_col_sep":",","encoding_to":"Encode to","encoding_to_help":"Choose output encoding. Leave empty to let current input encoding untouched: (%{name})","header_for_association_methods":"%{name} [%{association}]","header_for_root_methods":"%{name}","skip_header":"No header","skip_header_help":"Do not output a header (no fields description)"},"display":"Display %{name}: %{type}","empty_value_for_associated_objects":"\u003cempty\u003e","fields_from":"Fields from %{name}","fields_from_associated":"Fields from associated %{name}","options_for":"Options for %{name}","select":"Select fields to export","select_all_fields":"Select All Fields"},"flash":{"error":"%{name} failed to be %{action}","model_not_found":"Model '%{model}' could not be found","noaction":"No actions were taken","object_not_found":"%{model} with id '%{id}' could not be found","successful":"%{name} successfully %{action}"},"form":{"all_of_the_following_related_items_will_be_deleted":"? The following related items may be deleted or orphaned:","are_you_sure_you_want_to_delete_the_object":"Are you sure you want to delete this %{model_name}","basic_info":"Basic info","bulk_delete":"The following objects will be deleted, which may delete or orphan some of their related dependencies:","cancel":"Cancel","char_length_of":"length of","char_length_up_to":"length up to","confirmation":"Yes, I'm sure","new_model":"%{name} (new)","one_char":"character","optional":"Optional","required":"Required","save":"Save","save_and_add_another":"Save and add another","save_and_edit":"Save and edit"},"home":{"name":"Home"},"js":{"between_and_":"Between ... and ...","contains":"Contains","date":"Date ...","ends_with":"Ends with","false":false,"is_blank":"Is blank","is_exactly":"Is exactly","is_present":"Is present","last_week":"Last week","no_objects":"No objects found","number":"Number ...","starts_with":"Starts with","this_week":"This week","today":"Today","too_many_objects":"Too many objects, use search box above","true":true,"yesterday":"Yesterday"},"loading":"Loading...","misc":{"add_filter":"Add filter","add_new":"Add new","ago":"ago","bulk_menu_title":"Selected items","chose_all":"Choose all","chosen":"Chosen %{name}","clear_all":"Clear all","down":"Down","filter":"Filter","log_out":"Log out","navigation":"Navigation","navigation_static_label":"Links","refresh":"Refresh","remove":"Remove","search":"Search","show_all":"Show all","up":"Up"},"pagination":{"next":"Next \u0026raquo;","previous":"\u0026laquo; Prev","truncate":"…"},"table_headers":{"changes":"Changes","created_at":"Date/Time","item":"Item","last_used":"Last used","message":"Message","model_name":"Model name","records":"Records","username":"User"},"toggle_navigation":"Toggle navigation"},"date":{"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"formats":{"default":"%Y-%m-%d","long":"%B %d, %Y","short":"%b %d"},"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"half_a_minute":"half a minute","less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 month","other":"%{count} months"},"x_seconds":{"one":"1 second","other":"%{count} seconds"}},"prompts":{"day":"Day","hour":"Hour","minute":"Minute","month":"Month","second":"Seconds","year":"Year"}},"devise":{"confirmations":{"confirmed":"Your account was successfully confirmed.","send_instructions":"You will receive an email with instructions about how to confirm your account in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive an email with instructions about how to confirm your account in a few minutes."},"failure":{"already_authenticated":"You are already signed in.","inactive":"Your account is not activated yet.","invalid":"Invalid email or password.","last_attempt":"You have one more attempt before your account will be locked.","locked":"Your account is locked.","not_found_in_database":"Invalid email or password.","timeout":"Your session expired. Please sign in again to continue.","unauthenticated":"You need to sign in or sign up before continuing.","unconfirmed":"You have to confirm your account before continuing."},"mailer":{"confirmation_instructions":{"subject":"Confirmation instructions"},"password_change":{"subject":"Password Changed"},"reset_password_instructions":{"subject":"Reset password instructions"},"unlock_instructions":{"subject":"Unlock Instructions"}},"omniauth_callbacks":{"failure":"Could not authenticate you from %{kind} because \"%{reason}\".","success":"Successfully authenticated from %{kind} account."},"passwords":{"no_token":"You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.","send_instructions":"You will receive an email with instructions on how to reset your password in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.","updated":"Your password was changed successfully. You are now signed in.","updated_not_active":"Your password was changed successfully."},"registrations":{"destroyed":"Bye! Your account was successfully cancelled. We hope to see you again soon.","signed_up":"Welcome! You have signed up successfully.","signed_up_but_inactive":"You have signed up successfully. However, we could not sign you in because your account is not yet activated.","signed_up_but_locked":"You have signed up successfully. However, we could not sign you in because your account is locked.","signed_up_but_unconfirmed":"A message with a confirmation link has been sent to your email address. Please open the link to activate your account.","update_needs_confirmation":"You updated your account successfully, but we need to verify your new email address. Please check your email and click on the confirm link to finalize confirming your new email address.","updated":"You updated your account successfully."},"sessions":{"already_signed_out":"Signed out successfully.","signed_in":"Signed in successfully.","signed_out":"Signed out successfully."},"unlocks":{"send_instructions":"You will receive an email with instructions about how to unlock your account in a few minutes.","send_paranoid_instructions":"If your account exists, you will receive an email with instructions about how to unlock it in a few minutes.","unlocked":"Your account has been unlocked successfully. Please sign in to continue."}},"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","already_confirmed":"was already confirmed, please try signing in","blank":"can't be blank","confirmation":"doesn't match %{attribute}","confirmation_period_expired":"needs to be confirmed within %{period}, please request a new one","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","expired":"has expired, please request a new one","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","in_between":"must be in between %{min} and %{max}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","not_a_number":"is not a number","not_an_integer":"must be an integer","not_found":"not found","not_locked":"was not locked","not_saved":{"one":"1 error prohibited this %{resource} from being saved:","other":"%{count} errors prohibited this %{resource} from being saved:"},"odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","spoofed_media_type":"has contents that are not what they are reported to be","taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}}},"flash":{"actions":{"create":{"notice":"%{resource_name} was successfully created."},"destroy":{"alert":"%{resource_name} could not be destroyed.","notice":"%{resource_name} was successfully destroyed."},"update":{"notice":"%{resource_name} was successfully updated."}}},"helpers":{"page_entries_info":{"more_pages":{"display_entries":"Displaying %{entry_name} \u003cb\u003e%{first}\u0026nbsp;-\u0026nbsp;%{last}\u003c/b\u003e of \u003cb\u003e%{total}\u003c/b\u003e in total"},"one_page":{"display_entries":{"one":"Displaying \u003cb\u003e1\u003c/b\u003e %{entry_name}","other":"Displaying \u003cb\u003eall %{count}\u003c/b\u003e %{entry_name}","zero":"No %{entry_name} found"}}},"select":{"prompt":"Please select"},"submit":{"create":"Create %{model}","submit":"Save %{model}","update":"Update %{model}"}},"ingress/mission":{"difficulty_type":{"difficulty_type_all_capture_upgrade":"All Capture \u0026 Upgrade","difficulty_type_all_fielding":"All Fielding","difficulty_type_all_hacks":"All Hacks","difficulty_type_all_linking":"All Linking","difficulty_type_all_modding":"All Modding","difficulty_type_easy":"Easy (All Hack/Capture)","difficulty_type_hard":"Hard (Contains Modding/Linking/Fielding)","difficulty_type_not_set":"???"},"field_trip_waypoint_type":{"field_trip_waypoint_type_close":"Yes (close proximity)","field_trip_waypoint_type_far":"Yes (far proximity)","field_trip_waypoint_type_medium":"Yes (medium proximity)","field_trip_waypoint_type_none":"None","field_trip_waypoint_type_not_set":"???"},"passphrase_type":{"passphrase_type_logical":"Yes (Logical)","passphrase_type_none":"None","passphrase_type_not_set":"???","passphrase_type_other":"Yes (Other)","passphrase_type_research":"Yes (Research)"},"sequence_type":{"sequence_type_any_order":"Any Order","sequence_type_sequential":"Sequential","sequence_type_sequential_hidden":"Sequential Hidden"},"series_type":{"series_type_banner":"Banner","series_type_sequence":"Sequence","series_type_solo":"Solo"}},"number":{"currency":{"format":{"delimiter":",","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":",","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Billion","million":"Million","quadrillion":"Quadrillion","thousand":"Thousand","trillion":"Trillion","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"simple_form":{"error_notification":{"default_message":"Please review the problems below:"},"no":"No","required":{"mark":"*","text":"required"},"yes":"Yes"},"support":{"array":{"last_word_connector":", and ","two_words_connector":" and ","words_connector":", "}},"time":{"am":"am","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","long":"%B %d, %Y %H:%M","short":"%d %b %H:%M"},"pm":"pm"},"views":{"pagination":{"first":"\u0026laquo; First","last":"Last \u0026raquo;","next":"Next \u0026rsaquo;","previous":"\u0026lsaquo; Prev","truncate":"\u0026hellip;"}}});